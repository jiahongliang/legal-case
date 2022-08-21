package com.jhl.legalcase.web;

import com.alibaba.fastjson.JSON;
import com.jhl.legalcase.entity.SysAttachment;
import com.jhl.legalcase.repository.SysAttachmentRepository;
import com.jhl.legalcase.util.webmsg.WebResp;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping(value = "attachment")
public class SysAttachmentController {

    @Autowired
    SysAttachmentRepository attachmentRepository;

    @Value("${legalCase.attachment.location:false}")
    private String uploadPath;

    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public WebResp<SysAttachment, Object> upload(HttpServletRequest req) throws IOException {
        MultipartHttpServletRequest request = (MultipartHttpServletRequest) req;
        WebResp<SysAttachment, Object> result = new WebResp<>();
        String fileName = request.getFileNames().next();
        MultipartFile mFile = request.getFile(fileName);
        Assert.notNull(mFile, "文件上传参数不能为空");

        //文件名称
        String randomName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString();
        //文件原名称
        String originalFilename = mFile.getOriginalFilename();
        //原文件名
        String aloneName = originalFilename;
        if (originalFilename.contains(".")) {
            aloneName = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        }
        //文件后缀
        String suffix = originalFilename.substring(originalFilename.lastIndexOf(".") + 1, originalFilename.length());
        //存储文件名称
        String newFileName = randomName + "." + suffix;

        Map<String, String[]> params = request.getParameterMap();

        if (log.isDebugEnabled()) {
            log.debug("文件上传输入参数：" + JSON.toJSONString(params));
        }

        String[] nameArr = params.get("name");
        String name = aloneName;
        if (null != nameArr && nameArr.length > 0 && StringUtils.hasLength(nameArr[0])) {
            name = nameArr[0];
        }

        SysAttachment attachment = SysAttachment.builder().contentType(mFile.getContentType()).fileSize(mFile.getSize()).name(originalFilename).path(newFileName).build();
        attachmentRepository.save(attachment);

        //判断系统类型 \:windos操作系统 /:linux操作系统
        String separator = File.separator;
        //storePath=path.replaceAll("/", separator);

        //打开FileOutStrean流
        FileOutputStream fos = FileUtils.openOutputStream(new File(uploadPath + separator + newFileName));
        IOUtils.copy(mFile.getInputStream(), fos);
        fos.close();

        result.getRows().add(attachment);
        return result;
    }

    @GetMapping("get/{id}")
    public void getResourceById1(@PathVariable(value = "id") String id, HttpServletResponse res) {
        if (StringUtils.hasLength(id)) {
            SysAttachment attachment = attachmentRepository.getReferenceById(Long.valueOf(id));
            String downLoadName = attachment.getName();
            outStream(res, attachment.getPath(), downLoadName);
        }
    }

    /**
     * 下载资源文件
     *
     * @param res          response
     * @param storeName    文件系统文件名
     * @param downLoadName 要下载的文件名称
     */
    private void outStream(HttpServletResponse res, String storeName, String downLoadName) {
        File file = new File(uploadPath + File.separator + storeName);
        if (file.exists()) {
            res.setHeader("content-type", "application/octet-stream");
            res.setContentType("application/octet-stream");
            try {
                res.setHeader("Content-Length", String.valueOf(new FileInputStream(file).available()));
                res.setHeader("Content-Disposition", "attachment;filename=" + new String(downLoadName.getBytes("UTF-8"), "iso-8859-1"));
            } catch (UnsupportedEncodingException e1) {
                log.error("字符编码格式错误。");
                e1.printStackTrace();
            } catch (FileNotFoundException e) {
                log.error("文件不存在。");
                e.printStackTrace();
            } catch (IOException e) {
                log.error("文件IO异常。");
                e.printStackTrace();
            }
            byte[] buff = new byte[1024];
            BufferedInputStream bis = null;
            OutputStream os = null;
            try {
                os = res.getOutputStream();
                bis = new BufferedInputStream(new FileInputStream(file));
                int i = bis.read(buff);
                while (i != -1) {
                    os.write(buff, 0, buff.length);
                    os.flush();
                    i = bis.read(buff);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
