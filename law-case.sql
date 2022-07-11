/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : law-case

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 10/07/2022 10:49:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lc_case_execution
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution`;
CREATE TABLE `lc_case_execution` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_id` bigint(20) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `suspects` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution` VALUES (10, 1, '行政202207031835', NULL, 1, 1, '2022-07-03 18:36:00', 1, '2022-07-03 20:18:52');
INSERT INTO `lc_case_execution` VALUES (11, 3, '刑事202207091933', NULL, 1, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_execution_step
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution_step`;
CREATE TABLE `lc_case_execution_step` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_id` bigint(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `suspect` varchar(100) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution_step
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution_step` VALUES (24, 10, '受案', '张三', 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step` VALUES (25, 10, '受案', '李四', 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step` VALUES (26, 10, '受案', '王五', 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step` VALUES (27, 11, '立案', NULL, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
INSERT INTO `lc_case_execution_step` VALUES (28, 11, '勘验', NULL, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_execution_step_item
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution_step_item`;
CREATE TABLE `lc_case_execution_step_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_id` bigint(20) DEFAULT NULL,
  `step_id` bigint(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `law_title` varchar(2000) DEFAULT NULL,
  `status` int(4) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution_step_item
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution_step_item` VALUES (126, 10, 24, '受案表', '依据', 1, 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step_item` VALUES (127, 10, 24, '受案回执', '受案回执依据', 2, 1, '2022-07-03 18:36:00', 1, '2022-07-03 19:48:58');
INSERT INTO `lc_case_execution_step_item` VALUES (128, 10, 25, '受案表', '依据', 2, 1, '2022-07-03 18:36:00', 1, '2022-07-03 19:49:14');
INSERT INTO `lc_case_execution_step_item` VALUES (129, 10, 25, '受案回执', '受案回执依据', 1, 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step_item` VALUES (130, 10, 26, '受案表', '依据', 1, 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step_item` VALUES (131, 10, 26, '受案回执', '受案回执依据', 1, 1, '2022-07-03 18:36:00', 1, '2022-07-03 18:36:00');
INSERT INTO `lc_case_execution_step_item` VALUES (132, 11, 27, '立案决定书', '立案依据', 1, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
INSERT INTO `lc_case_execution_step_item` VALUES (133, 11, 27, '立案告知书', '立案依据', 1, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
INSERT INTO `lc_case_execution_step_item` VALUES (134, 11, 28, '勘验笔录', '勘验依据', 1, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:43');
INSERT INTO `lc_case_execution_step_item` VALUES (135, 11, 28, '现场照片', '勘验依据', 2, 1, '2022-07-09 19:33:43', 1, '2022-07-09 19:33:57');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_execution_suspect
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution_suspect`;
CREATE TABLE `lc_case_execution_suspect` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_id` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution_suspect
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution_suspect` VALUES (1, 2, '张三', 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_suspect` VALUES (2, 2, '李四', 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_suspect` VALUES (3, 3, '小明', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_suspect` VALUES (4, 3, '小王', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_suspect` VALUES (5, 4, 'John', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_suspect` VALUES (6, 4, 'Sam', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_suspect` VALUES (7, 5, '流星', 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_type
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_type`;
CREATE TABLE `lc_case_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `memo` varchar(2000) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_type
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_type` VALUES (1, '100', '行政', '行政类别', 1, '2022-06-13 23:03:14', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type` VALUES (3, '200', '刑事', '刑事类别', 1, '2022-06-13 23:19:25', 1, '2022-07-01 18:02:25');
INSERT INTO `lc_case_type` VALUES (4, '300', '专题', '专题类型', 1, '2022-06-18 20:37:05', 1, '2022-06-22 16:30:17');
INSERT INTO `lc_case_type` VALUES (7, NULL, '新专题', '新专题', 1, '2022-06-22 17:16:15', 1, '2022-06-22 17:17:01');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_type_step
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_type_step`;
CREATE TABLE `lc_case_type_step` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_id` bigint(20) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `order_value` int(11) DEFAULT NULL,
  `items` varchar(6000) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl21qbfr7h6i14psc3fiywof40` (`type_id`),
  CONSTRAINT `FKl21qbfr7h6i14psc3fiywof40` FOREIGN KEY (`type_id`) REFERENCES `lc_case_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_type_step
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_type_step` VALUES (3, NULL, NULL, '办案环节1', 1, '1,2,3', 1, '2022-06-22 14:11:22', 1, '2022-06-22 14:11:22');
INSERT INTO `lc_case_type_step` VALUES (4, NULL, NULL, '办案环节2', 2, '4,5,6', 1, '2022-06-22 14:11:22', 1, '2022-06-22 14:11:22');
INSERT INTO `lc_case_type_step` VALUES (5, NULL, NULL, '办案环节3', 3, 'q,w,e', 1, '2022-06-22 14:11:22', 1, '2022-06-22 14:11:22');
INSERT INTO `lc_case_type_step` VALUES (6, NULL, NULL, '办案环节1', 1, '', 1, '2022-06-22 14:17:20', 1, '2022-06-22 14:17:20');
INSERT INTO `lc_case_type_step` VALUES (7, NULL, NULL, '办案环节2', 2, '', 1, '2022-06-22 14:17:20', 1, '2022-06-22 14:17:20');
INSERT INTO `lc_case_type_step` VALUES (8, NULL, NULL, '办案环节1', 1, '', 1, '2022-06-22 14:19:41', 1, '2022-06-22 14:19:41');
INSERT INTO `lc_case_type_step` VALUES (9, NULL, NULL, '办案环节2', 2, '', 1, '2022-06-22 14:19:41', 1, '2022-06-22 14:19:41');
INSERT INTO `lc_case_type_step` VALUES (10, NULL, NULL, '办案环节1', 1, '', 1, '2022-06-22 14:21:29', 1, '2022-06-22 14:21:29');
INSERT INTO `lc_case_type_step` VALUES (11, NULL, NULL, '办案环节2', 2, '', 1, '2022-06-22 14:21:29', 1, '2022-06-22 14:21:29');
INSERT INTO `lc_case_type_step` VALUES (12, NULL, NULL, '办案环节3', 3, '', 1, '2022-06-22 14:21:29', 1, '2022-06-22 14:21:29');
INSERT INTO `lc_case_type_step` VALUES (15, 1, NULL, '受案', 1, '受案表,受案回执', 1, '2022-06-22 14:30:12', 1, '2022-06-25 22:06:48');
INSERT INTO `lc_case_type_step` VALUES (16, 1, NULL, '传唤', 2, '传唤审批,延长传唤审批,告知传唤的原因和依据,通知家属,注明在案时间,保证饮食和休息', 1, '2022-06-22 14:30:12', 1, '2022-06-25 22:06:48');
INSERT INTO `lc_case_type_step` VALUES (21, 3, NULL, '立案', 1, '立案决定书,立案告知书', 1, '2022-06-22 16:28:35', 1, '2022-06-26 08:15:50');
INSERT INTO `lc_case_type_step` VALUES (22, 3, NULL, '勘验', 2, '勘验笔录,现场照片,现场图,对照片应当有文字说明,勘察人、见证人签字,重大案件应当录像,现场勘查证', 1, '2022-06-22 16:28:35', 1, '2022-06-26 08:15:50');
INSERT INTO `lc_case_type_step` VALUES (25, 4, NULL, '受理', 1, '', 1, '2022-06-22 16:30:17', 1, '2022-06-22 16:30:17');
INSERT INTO `lc_case_type_step` VALUES (26, 4, NULL, '质询', 2, '', 1, '2022-06-22 16:30:17', 1, '2022-06-22 16:30:17');
INSERT INTO `lc_case_type_step` VALUES (27, 4, NULL, '公诉', 3, '', 1, '2022-06-22 16:30:17', 1, '2022-06-22 16:30:17');
INSERT INTO `lc_case_type_step` VALUES (30, 7, NULL, '办案环节1', 1, '', 1, '2022-06-22 17:16:15', 1, '2022-06-22 17:16:15');
INSERT INTO `lc_case_type_step` VALUES (31, 7, NULL, '办案环节2', 2, '', 1, '2022-06-22 17:16:15', 1, '2022-06-22 17:16:15');
INSERT INTO `lc_case_type_step` VALUES (32, 7, NULL, '办案环节3', 3, '', 1, '2022-06-22 17:16:15', 1, '2022-06-22 17:16:15');
INSERT INTO `lc_case_type_step` VALUES (33, 7, NULL, '办案环节4', 4, '1,2,3,4', 1, '2022-06-22 17:16:29', 1, '2022-06-22 17:17:01');
INSERT INTO `lc_case_type_step` VALUES (34, 1, NULL, '询问嫌疑人', 3, '询问笔录,权利义务告知,三个规定告知,伤害案件权利义务告知,监护人在场,翻译人,办案区录像', 1, '2022-06-25 22:07:28', 1, '2022-06-25 22:11:41');
INSERT INTO `lc_case_type_step` VALUES (35, 1, NULL, '询问被害人', 4, '询问笔录,权利义务告知,三个规定告知,伤害案件权利义务告知,监护人在场,翻译人', 1, '2022-06-25 22:11:41', 1, '2022-06-25 22:11:41');
INSERT INTO `lc_case_type_step` VALUES (36, 1, NULL, '询问证人', 5, '询问通知书,权利义务告知,三个规定告知,伤害案件权利义务告知,监护人在场,翻译人', 1, '2022-06-25 22:11:41', 1, '2022-06-25 22:11:41');
INSERT INTO `lc_case_type_step` VALUES (37, 1, NULL, '扣押', 6, '证据保全决定书,公安机关负责人审批,扣押物品清单,制作现场笔录,办案人和持有人签字,县局审批延期,延期告知当事人', 1, '2022-06-25 22:13:34', 1, '2022-06-25 22:13:34');
INSERT INTO `lc_case_type_step` VALUES (38, 1, NULL, '勘验', 7, '勘验笔录,勘察人、见证人签字,现场照片,现场图,对照品文字说明,现场勘察证', 1, '2022-06-25 22:18:24', 1, '2022-06-25 22:18:24');
INSERT INTO `lc_case_type_step` VALUES (39, 1, NULL, '鉴定', 8, '鉴定聘请书,鉴定单位资质,鉴定人资质,5日内告知当事人,3日内答复重新鉴定申请', 1, '2022-06-25 22:18:24', 1, '2022-06-25 22:18:24');
INSERT INTO `lc_case_type_step` VALUES (40, 1, NULL, '吸毒检测', 9, '相关人员的资质,不配合可强制检测', 1, '2022-06-25 22:18:24', 1, '2022-06-25 22:18:24');
INSERT INTO `lc_case_type_step` VALUES (41, 1, NULL, '辨认', 10, '辨认笔录,人数7人以上,照片10张以上,物品5件以上,侦查人、辩认人、见证人签字,不重复陪衬', 1, '2022-06-25 22:18:24', 1, '2022-06-25 22:18:24');
INSERT INTO `lc_case_type_step` VALUES (42, 1, NULL, '检查', 11, '检查证,县级以上审批,检查女性身体由女工作人员进行,制作检查笔录、全程录像可不记录,办案人、检查人、被检查人、见证人签字,被检查人拒绝的注明', 1, '2022-06-25 22:20:44', 1, '2022-06-25 22:20:44');
INSERT INTO `lc_case_type_step` VALUES (43, 1, NULL, '抽样取证', 12, '办案人员负责人批准,全程录像,及时检查,减损应予补偿', 1, '2022-06-25 22:23:54', 1, '2022-06-25 22:23:54');
INSERT INTO `lc_case_type_step` VALUES (44, 1, NULL, '调取证据', 13, '调取证据通知书,办案部门负责人批准,办案人签字,调取时间,有制作过程、原件存放处以及核对无误的文字说明,持有人签字', 1, '2022-06-25 22:23:54', 1, '2022-06-25 22:23:54');
INSERT INTO `lc_case_type_step` VALUES (45, 1, NULL, '书证', 14, '来源说明,办案人签字,调取时间', 1, '2022-06-25 22:25:03', 1, '2022-06-25 22:25:03');
INSERT INTO `lc_case_type_step` VALUES (46, 1, NULL, '音视频', 15, '扣押时予以检查,扣押现场笔录,办案人签字,调取时间,记录案由、内容、录取和复制时间地点', 1, '2022-06-26 07:47:35', 1, '2022-06-26 07:47:35');
INSERT INTO `lc_case_type_step` VALUES (47, 1, NULL, '照片', 16, '文字说明,办案人签字,调取时间', 1, '2022-06-26 07:47:35', 1, '2022-06-26 07:47:35');
INSERT INTO `lc_case_type_step` VALUES (48, 1, NULL, '查封', 17, '证据保全决定书,公安机关负责人审批,制作现场笔录、全程录像可不记录,限专门用于违法场所设施,办案人和持有人签字、有见证人则签字、拒签注明,县局审批延期,延期告知当事人', 1, '2022-06-26 07:47:35', 1, '2022-06-26 07:47:35');
INSERT INTO `lc_case_type_step` VALUES (49, 1, NULL, '先行登记保存', 18, '办案部门负责人批准,登记保存清单,办案人、持有人、见证人签字,超7日自动解除', 1, '2022-06-26 08:01:26', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type_step` VALUES (50, 1, NULL, '处罚前告知', 19, '行政处罚告知笔录,办案人、被告人签字,具体处理意见、情节,区分听证案件范围,申辩的复核', 1, '2022-06-26 08:01:26', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type_step` VALUES (51, 1, NULL, '行政处罚决定', 20, '行政处罚决定书,无空项,二日内送当事人,拘留处罚通知家属,拘留回执,罚没票据', 1, '2022-06-26 08:01:26', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type_step` VALUES (52, 1, NULL, '其他处理决定', 21, '依法审批,形成处理决定文书,送达有关人员和单位', 1, '2022-06-26 08:01:26', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type_step` VALUES (53, 1, NULL, '执行', 22, '对依法做出的处理决定执行,执行证明', 1, '2022-06-26 08:01:26', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type_step` VALUES (54, 3, NULL, '立案', 3, '立案决定书,立案告知书', 1, '2022-06-26 08:15:50', 1, '2022-06-26 08:15:50');
INSERT INTO `lc_case_type_step` VALUES (55, 3, NULL, '扣押', 4, '扣押决定书,区分审批权限,扣押物品清单,拍照或者录音录像,办案人、持有人、见证人签字,持有人不在或者拒签注明', 1, '2022-06-26 08:15:50', 1, '2022-06-26 08:15:50');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_type_step_item
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_type_step_item`;
CREATE TABLE `lc_case_type_step_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `step_id` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `law_title` varchar(2000) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK3o4x4kb5wf51m1xju86qlo124` (`step_id`),
  CONSTRAINT `FK3o4x4kb5wf51m1xju86qlo124` FOREIGN KEY (`step_id`) REFERENCES `lc_case_type_step` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_type_step_item
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_type_step_item` VALUES (8, 15, '受案表', '依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (9, 15, '受案回执', '受案回执依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (10, 16, '传唤审批', '传唤审批依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (11, 16, '延长传唤审批', '延长传唤审批依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (12, 16, '告知传唤的原因和依据', '告知依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (13, 34, '讯问笔录', '询问笔录依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (14, 34, '权利义务告知', '告知依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (15, 35, '讯问笔录', '笔录依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (16, 35, '权利义务告知', '告知依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (17, 36, '询问通知书', '通知书依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (18, 36, '权利义务告知', '告知依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (19, 37, '证据保全决定书', '保全依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (20, 37, '公安机关负责人审批', '审批依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (21, 38, '勘验笔录', '勘验笔录依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (22, 38, '现场照片', '照片依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (23, 39, '鉴定聘请书', '聘请书依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (24, 39, '鉴定单位资质', '资质依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (25, 40, '相关人员资质', '资质依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (26, 40, '不配合可强制检测', '不配合依据', 1, '2022-07-01 17:48:28', 1, '2022-07-01 17:48:28');
INSERT INTO `lc_case_type_step_item` VALUES (27, 41, '辨认笔录', '辨认笔录依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (28, 41, '人数7人以上', '人数依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (29, 42, '检查证', '检查证依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (30, 42, '县级以上审批', '审批依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (31, 43, '办案部门负责人批准', '办案依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (32, 43, '全程录像', '办案依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (33, 44, '调取证据通知书', '调取证据依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (34, 44, '办案部门负责人批准', '办案部门负责人批准依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (35, 45, '来源说明', '来源依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (36, 45, '办案人签字', '办案人依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (37, 46, '扣押时予以检查', '扣押依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (38, 46, '扣押现场笔录', '扣押依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (39, 47, '文字说明', '照片依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (40, 47, '办案人签字', '照片依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (41, 48, '证据保全决定书', '查封依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (42, 48, '公安机关负责人审批', '查封依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (43, 49, '办案部门负责人批准', '登记保存依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (44, 49, '登记保存清单', '登记依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (45, 50, '行政处罚告知笔录', '处罚前告知依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (46, 50, '办案人、被告知人签字', '处罚告知依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (47, 51, '行政处罚决定书', '行政处罚依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (48, 51, '无空项', '行政处罚依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (49, 52, '依法审批', '审批依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (50, 52, '形成处理决定文书', '审批依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (51, 53, '执行证明', '执行依据', 1, '2022-07-01 17:55:15', 1, '2022-07-01 17:55:15');
INSERT INTO `lc_case_type_step_item` VALUES (52, 21, '立案决定书', '立案依据', 1, '2022-07-01 17:56:23', 1, '2022-07-01 17:56:23');
INSERT INTO `lc_case_type_step_item` VALUES (53, 21, '立案告知书', '立案依据', 1, '2022-07-01 17:56:23', 1, '2022-07-01 17:56:23');
INSERT INTO `lc_case_type_step_item` VALUES (54, 22, '勘验笔录', '勘验依据', 1, '2022-07-01 17:56:23', 1, '2022-07-01 17:56:23');
INSERT INTO `lc_case_type_step_item` VALUES (55, 22, '现场照片', '勘验依据', 1, '2022-07-01 17:56:23', 1, '2022-07-01 17:56:23');
INSERT INTO `lc_case_type_step_item` VALUES (56, 54, '立案决定书', '立案依据', 1, '2022-07-01 18:02:11', 1, '2022-07-01 18:02:11');
INSERT INTO `lc_case_type_step_item` VALUES (57, 54, '立案告知书', '立案依据', 1, '2022-07-01 18:02:11', 1, '2022-07-01 18:02:11');
INSERT INTO `lc_case_type_step_item` VALUES (58, 55, '扣押决定书', '扣押依据', 1, '2022-07-01 18:02:11', 1, '2022-07-01 18:02:11');
INSERT INTO `lc_case_type_step_item` VALUES (59, 55, '扣押物品清单', '扣押物品清单依据', 1, '2022-07-01 18:02:11', 1, '2022-07-01 18:02:11');
COMMIT;

-- ----------------------------
-- Table structure for lc_subject
-- ----------------------------
DROP TABLE IF EXISTS `lc_subject`;
CREATE TABLE `lc_subject` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlsa69jp0c73ahpmdkoqntitg` (`parent_id`),
  CONSTRAINT `FKlsa69jp0c73ahpmdkoqntitg` FOREIGN KEY (`parent_id`) REFERENCES `lc_subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_subject
-- ----------------------------
BEGIN;
INSERT INTO `lc_subject` VALUES (15, NULL, '环保', 1, '2022-07-10 09:25:07', 1, '2022-07-10 09:25:07');
INSERT INTO `lc_subject` VALUES (16, NULL, '涉税', 1, '2022-07-10 09:25:21', 1, '2022-07-10 09:25:21');
INSERT INTO `lc_subject` VALUES (17, NULL, '烟草', 1, '2022-07-10 09:25:36', 1, '2022-07-10 09:25:36');
INSERT INTO `lc_subject` VALUES (18, NULL, '消防', 1, '2022-07-10 09:25:46', 1, '2022-07-10 09:25:46');
COMMIT;

-- ----------------------------
-- Table structure for lc_subject_item
-- ----------------------------
DROP TABLE IF EXISTS `lc_subject_item`;
CREATE TABLE `lc_subject_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `law_title` varchar(200) DEFAULT NULL,
  `law_content` longtext,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_subject_item
-- ----------------------------
BEGIN;
INSERT INTO `lc_subject_item` VALUES (1, 15, '无环评不停建', '环境保护法63.1.1', '      第六十三条 企业事业单位和其他生产经营者有下列行为之一，尚不构成犯罪的，除依照有关法律法规规定予以处罚外，由县级以上人民政府环境保护主管部门或者其他有关部门将案件移送公安机关，对其直接负责的主管人员和其他直接责任人员，处十日以上十五日以下拘留；情节较轻的，处五日以上十日以下拘留：\n\n（一）建设项目未依法进行环境影响评价，被责令停止建设，拒不执行的；\n\n（二）违反法律规定，未取得排污许可证排放污染物，被责令停止排污，拒不执行的；\n\n（三）通过暗管、渗井、渗坑、灌注或者篡改、伪造监测数据，或者不正常运行防治污染设施等逃避监管的方式违法排放污染物的；\n\n（四）生产、使用国家明令禁止生产、使用的农药，被责令改正，拒不改正的。', 1, '2022-07-10 09:29:21', 1, '2022-07-10 09:31:33');
INSERT INTO `lc_subject_item` VALUES (2, 15, '无许可不停排', '环境保护法63.1.2', '      第六十三条 企业事业单位和其他生产经营者有下列行为之一，尚不构成犯罪的，除依照有关法律法规规定予以处罚外，由县级以上人民政府环境保护主管部门或者其他有关部门将案件移送公安机关，对其直接负责的主管人员和其他直接责任人员，处十日以上十五日以下拘留；情节较轻的，处五日以上十日以下拘留：\n\n（一）建设项目未依法进行环境影响评价，被责令停止建设，拒不执行的；\n\n（二）违反法律规定，未取得排污许可证排放污染物，被责令停止排污，拒不执行的；\n\n（三）通过暗管、渗井、渗坑、灌注或者篡改、伪造监测数据，或者不正常运行防治污染设施等逃避监管的方式违法排放污染物的；\n\n（四）生产、使用国家明令禁止生产、使用的农药，被责令改正，拒不改正的。', 1, '2022-07-10 09:32:16', 1, '2022-07-10 09:32:25');
INSERT INTO `lc_subject_item` VALUES (3, 15, '逃避监管偷排', '环境保护法63.1.3', '      第六十三条 企业事业单位和其他生产经营者有下列行为之一，尚不构成犯罪的，除依照有关法律法规规定予以处罚外，由县级以上人民政府环境保护主管部门或者其他有关部门将案件移送公安机关，对其直接负责的主管人员和其他直接责任人员，处十日以上十五日以下拘留；情节较轻的，处五日以上十日以下拘留：\n\n（一）建设项目未依法进行环境影响评价，被责令停止建设，拒不执行的；\n\n（二）违反法律规定，未取得排污许可证排放污染物，被责令停止排污，拒不执行的；\n\n（三）通过暗管、渗井、渗坑、灌注或者篡改、伪造监测数据，或者不正常运行防治污染设施等逃避监管的方式违法排放污染物的；\n\n（四）生产、使用国家明令禁止生产、使用的农药，被责令改正，拒不改正的。', 1, '2022-07-10 09:33:14', 1, '2022-07-10 09:33:23');
INSERT INTO `lc_subject_item` VALUES (4, 15, '生产使用禁用农药', '环境保护法63.1.4', '      第六十三条 企业事业单位和其他生产经营者有下列行为之一，尚不构成犯罪的，除依照有关法律法规规定予以处罚外，由县级以上人民政府环境保护主管部门或者其他有关部门将案件移送公安机关，对其直接负责的主管人员和其他直接责任人员，处十日以上十五日以下拘留；情节较轻的，处五日以上十日以下拘留：\n\n（一）建设项目未依法进行环境影响评价，被责令停止建设，拒不执行的；\n\n（二）违反法律规定，未取得排污许可证排放污染物，被责令停止排污，拒不执行的；\n\n（三）通过暗管、渗井、渗坑、灌注或者篡改、伪造监测数据，或者不正常运行防治污染设施等逃避监管的方式违法排放污染物的；\n\n（四）生产、使用国家明令禁止生产、使用的农药，被责令改正，拒不改正的。', 1, '2022-07-10 09:33:46', 1, '2022-07-10 09:33:55');
INSERT INTO `lc_subject_item` VALUES (6, 16, '阻碍执行职务', '阻碍执行职务', '阻碍执行职务', 1, '2022-07-10 09:40:22', 1, '2022-07-10 09:40:22');
INSERT INTO `lc_subject_item` VALUES (7, 16, '逃税', '逃税', '逃税', 1, '2022-07-10 09:40:34', 1, '2022-07-10 09:40:34');
INSERT INTO `lc_subject_item` VALUES (8, 16, '虚开增值税专用发票', '虚开增值税专用发票', '虚开增值税专用发票', 1, '2022-07-10 09:40:45', 1, '2022-07-10 09:40:45');
INSERT INTO `lc_subject_item` VALUES (9, 17, '阻碍执行职务', '阻碍执行职务', '阻碍执行职务', 1, '2022-07-10 09:41:08', 1, '2022-07-10 09:41:08');
INSERT INTO `lc_subject_item` VALUES (10, 17, '非法经营', '非法经营', '非法经营', 1, '2022-07-10 09:41:20', 1, '2022-07-10 09:41:20');
INSERT INTO `lc_subject_item` VALUES (11, 17, '生产销售伪劣', '生产销售伪劣', '生产销售伪劣', 1, '2022-07-10 09:41:30', 1, '2022-07-10 09:41:30');
INSERT INTO `lc_subject_item` VALUES (12, 17, '假冒注册商标', '假冒注册商标', '假冒注册商标', 1, '2022-07-10 09:41:42', 1, '2022-07-10 09:41:42');
INSERT INTO `lc_subject_item` VALUES (13, 18, '违反规定进入危险场所', '消防法63.1.1', '   第六十三条 违反本法规定，有下列行为之一的，处警告或者五百元以下罚款；情节严重的，处五日以下拘留：\n\n（一）违反消防安全规定进入生产、储存易燃易爆危险品场所的；\n\n（二）违反规定使用明火作业或者在具有火灾、爆炸危险的场所吸烟、使用明火的。', 1, '2022-07-10 09:42:58', 1, '2022-07-10 09:42:58');
INSERT INTO `lc_subject_item` VALUES (14, 18, '危险场所使用明火', '消防法63.1.2', '  第六十三条 违反本法规定，有下列行为之一的，处警告或者五百元以下罚款；情节严重的，处五日以下拘留：\n\n（一）违反消防安全规定进入生产、储存易燃易爆危险品场所的；\n\n（二）违反规定使用明火作业或者在具有火灾、爆炸危险的场所吸烟、使用明火的。', 1, '2022-07-10 09:43:35', 1, '2022-07-10 09:43:35');
INSERT INTO `lc_subject_item` VALUES (15, 18, '过失火灾', '消防法64.1.1', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:44:11', 1, '2022-07-10 09:44:11');
INSERT INTO `lc_subject_item` VALUES (16, 18, '冒险作业', '消防法64.1.2', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:44:51', 1, '2022-07-10 09:44:51');
INSERT INTO `lc_subject_item` VALUES (17, 18, '不及时报警', '消防法64.1.3', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:45:57', 1, '2022-07-10 09:45:57');
INSERT INTO `lc_subject_item` VALUES (18, 18, '扰乱火场秩序', '消防法64.1.4', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:46:25', 1, '2022-07-10 09:46:25');
INSERT INTO `lc_subject_item` VALUES (19, 18, '破坏、伪造现场', '消防法64.1.5', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:47:07', 1, '2022-07-10 09:47:07');
INSERT INTO `lc_subject_item` VALUES (20, 18, '擅自解封', '消防法64.1.6', '  第六十四条 违反本法规定，有下列行为之一，尚不构成犯罪的，处十日以上十五日以下拘留，可以并处五百元以下罚款；情节较轻的，处警告或者五百元以下罚款：\n\n（一）指使或者强令他人违反消防安全规定，冒险作业的；\n\n（二）过失引起火灾的；\n\n（三）在火灾发生后阻拦报警，或者负有报告职责的人员不及时报警的；\n\n（四）扰乱火灾现场秩序，或者拒不执行火灾现场指挥员指挥，影响灭火救援的；\n\n（五）故意破坏或者伪造火灾现场的；\n\n（六）擅自拆封或者使用被消防救援机构查封的场所、部位的。', 1, '2022-07-10 09:47:56', 1, '2022-07-10 09:47:56');
INSERT INTO `lc_subject_item` VALUES (21, 18, '不组织疏散', '消防法68', '    第六十八条 人员密集场所发生火灾，该场所的现场工作人员不履行组织、引导在场人员疏散的义务，情节严重，尚不构成犯罪的，处五日以上十日以下拘留。', 1, '2022-07-10 09:48:42', 1, '2022-07-10 09:48:42');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `memo` varchar(2000) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (1, 'ADMIN', '管理员', '管理员', 1, '2022-06-27 10:13:29', 1, '2022-06-27 10:13:34');
INSERT INTO `sys_role` VALUES (2, 'USER', '用户', '用户', 1, '2022-06-27 10:14:09', 1, '2022-06-27 10:14:14');
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `dept_name` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `memo` varchar(2000) DEFAULT NULL,
  `role` varchar(500) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, '管理员', '男', '行政部', '13000000000', '$2a$10$EpY/PC9nnJA.iivgMoETVOQVwa.D2lq3qglCwb442gDgDu60GQzUG', NULL, 'ADMIN,USER', 1, 1, '2022-06-08 21:26:23', 1, '2022-07-10 10:47:37');
INSERT INTO `sys_user` VALUES (2, 'test1', '男', '井店镇派出所', '13000000002', '$2a$10$bYFKJ8xCrDXQ2ytmV3SeAe0b2gvNtbNHVvhx7/AGrBBT77N.R4Msa', '123', 'USER', 2, 1, '2022-06-12 13:02:35', 1, '2022-06-27 14:31:17');
INSERT INTO `sys_user` VALUES (3, '秦始皇', '男', '长安派出所', '13000000001', '$2a$10$FE1CTfWlD0zCa6YJ/BmifOb9ZVvJy2kx9Yy.EXCJsR4Yc1hun9F7y', '我是长安派出所的秦始皇，请审批', 'USER', 1, 1, '2022-06-27 14:06:27', 1, '2022-06-27 14:31:17');
INSERT INTO `sys_user` VALUES (4, '刘邦', '男', '泗水亭长', '13000000003', '$2a$10$C3CBkHLjWi9NFZ0dctgbtupzXR7eZqMYeR/NnKcyqlB12rmuuyOCS', '我是泗水亭长，请审批', 'USER', 0, 1, '2022-06-27 14:07:11', 1, '2022-06-27 14:07:11');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
