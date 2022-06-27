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

 Date: 27/06/2022 15:29:02
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution` VALUES (2, 3, '案件一', '张三,李四', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:29:29');
INSERT INTO `lc_case_execution` VALUES (3, 3, '案件二', '小明,小王', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution` VALUES (4, 3, '案件三', 'John,Sam', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution` VALUES (5, 3, '案件四', '流星', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_execution_step
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution_step`;
CREATE TABLE `lc_case_execution_step` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_id` bigint(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution_step
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution_step` VALUES (1, 2, '立案', 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step` VALUES (2, 2, '勘验', 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step` VALUES (3, 2, '扣押', 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step` VALUES (4, 3, '立案', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step` VALUES (5, 3, '勘验', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step` VALUES (6, 3, '立案', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step` VALUES (7, 3, '扣押', 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step` VALUES (8, 4, '立案', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step` VALUES (9, 4, '勘验', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step` VALUES (10, 4, '立案', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step` VALUES (11, 4, '扣押', 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step` VALUES (12, 5, '立案', 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step` VALUES (13, 5, '勘验', 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step` VALUES (14, 5, '立案', 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step` VALUES (15, 5, '扣押', 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
COMMIT;

-- ----------------------------
-- Table structure for lc_case_execution_step_item
-- ----------------------------
DROP TABLE IF EXISTS `lc_case_execution_step_item`;
CREATE TABLE `lc_case_execution_step_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_id` bigint(20) DEFAULT NULL,
  `step_id` bigint(20) DEFAULT NULL,
  `suspect_id` bigint(20) DEFAULT NULL,
  `item_name` varchar(200) DEFAULT NULL,
  `status` int(4) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `lastmodified_by` bigint(20) DEFAULT NULL,
  `lastmodified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lc_case_execution_step_item
-- ----------------------------
BEGIN;
INSERT INTO `lc_case_execution_step_item` VALUES (1, 2, 1, 1, '立案决定书', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (2, 2, 1, 1, '立案告知书', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (3, 2, 1, 2, '立案决定书', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (4, 2, 1, 2, '立案告知书', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (5, 2, 2, 1, '勘验笔录', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (6, 2, 2, 1, '现场照片', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (7, 2, 2, 1, '现场图', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (8, 2, 2, 1, '对照片应当有文字说明', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (9, 2, 2, 1, '勘察人、见证人签字', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (10, 2, 2, 1, '重大案件应当录像', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (11, 2, 2, 1, '现场勘查证', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (12, 2, 2, 2, '勘验笔录', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (13, 2, 2, 2, '现场照片', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (14, 2, 2, 2, '现场图', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (15, 2, 2, 2, '对照片应当有文字说明', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (16, 2, 2, 2, '勘察人、见证人签字', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (17, 2, 2, 2, '重大案件应当录像', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (18, 2, 2, 2, '现场勘查证', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (19, 2, 3, 1, '扣押决定书', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (20, 2, 3, 1, '区分审批权限', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (21, 2, 3, 1, '扣押物品清单', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (22, 2, 3, 1, '拍照或者录音录像', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (23, 2, 3, 1, '办案人、持有人、见证人签字', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (24, 2, 3, 1, '持有人不在或者拒签注明', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:24:55');
INSERT INTO `lc_case_execution_step_item` VALUES (25, 2, 3, 2, '扣押决定书', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (26, 2, 3, 2, '区分审批权限', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (27, 2, 3, 2, '扣押物品清单', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (28, 2, 3, 2, '拍照或者录音录像', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:27:23');
INSERT INTO `lc_case_execution_step_item` VALUES (29, 2, 3, 2, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 11:39:52', 1, '2022-06-26 11:39:52');
INSERT INTO `lc_case_execution_step_item` VALUES (30, 2, 3, 2, '持有人不在或者拒签注明', 2, 1, '2022-06-26 11:39:52', 1, '2022-06-26 23:29:15');
INSERT INTO `lc_case_execution_step_item` VALUES (31, 3, 4, 3, '立案决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (32, 3, 4, 3, '立案告知书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (33, 3, 4, 4, '立案决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (34, 3, 4, 4, '立案告知书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (35, 3, 5, 3, '勘验笔录', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (36, 3, 5, 3, '现场照片', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (37, 3, 5, 3, '现场图', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (38, 3, 5, 3, '对照片应当有文字说明', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (39, 3, 5, 3, '勘察人、见证人签字', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (40, 3, 5, 3, '重大案件应当录像', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (41, 3, 5, 3, '现场勘查证', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (42, 3, 5, 4, '勘验笔录', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (43, 3, 5, 4, '现场照片', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (44, 3, 5, 4, '现场图', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (45, 3, 5, 4, '对照片应当有文字说明', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (46, 3, 5, 4, '勘察人、见证人签字', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (47, 3, 5, 4, '重大案件应当录像', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (48, 3, 5, 4, '现场勘查证', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (49, 3, 6, 3, '立案决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (50, 3, 6, 3, '立案告知书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (51, 3, 6, 4, '立案决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (52, 3, 6, 4, '立案告知书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (53, 3, 7, 3, '扣押决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (54, 3, 7, 3, '区分审批权限', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (55, 3, 7, 3, '扣押物品清单', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (56, 3, 7, 3, '拍照或者录音录像', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (57, 3, 7, 3, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (58, 3, 7, 3, '持有人不在或者拒签注明', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (59, 3, 7, 4, '扣押决定书', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (60, 3, 7, 4, '区分审批权限', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (61, 3, 7, 4, '扣押物品清单', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (62, 3, 7, 4, '拍照或者录音录像', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (63, 3, 7, 4, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (64, 3, 7, 4, '持有人不在或者拒签注明', 1, 1, '2022-06-26 23:35:06', 1, '2022-06-26 23:35:06');
INSERT INTO `lc_case_execution_step_item` VALUES (65, 4, 8, 5, '立案决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (66, 4, 8, 5, '立案告知书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (67, 4, 8, 6, '立案决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (68, 4, 8, 6, '立案告知书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (69, 4, 9, 5, '勘验笔录', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (70, 4, 9, 5, '现场照片', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (71, 4, 9, 5, '现场图', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (72, 4, 9, 5, '对照片应当有文字说明', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (73, 4, 9, 5, '勘察人、见证人签字', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (74, 4, 9, 5, '重大案件应当录像', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (75, 4, 9, 5, '现场勘查证', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (76, 4, 9, 6, '勘验笔录', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (77, 4, 9, 6, '现场照片', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (78, 4, 9, 6, '现场图', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (79, 4, 9, 6, '对照片应当有文字说明', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (80, 4, 9, 6, '勘察人、见证人签字', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (81, 4, 9, 6, '重大案件应当录像', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (82, 4, 9, 6, '现场勘查证', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (83, 4, 10, 5, '立案决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (84, 4, 10, 5, '立案告知书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (85, 4, 10, 6, '立案决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (86, 4, 10, 6, '立案告知书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (87, 4, 11, 5, '扣押决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (88, 4, 11, 5, '区分审批权限', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (89, 4, 11, 5, '扣押物品清单', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (90, 4, 11, 5, '拍照或者录音录像', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (91, 4, 11, 5, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (92, 4, 11, 5, '持有人不在或者拒签注明', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (93, 4, 11, 6, '扣押决定书', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (94, 4, 11, 6, '区分审批权限', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (95, 4, 11, 6, '扣押物品清单', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (96, 4, 11, 6, '拍照或者录音录像', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (97, 4, 11, 6, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (98, 4, 11, 6, '持有人不在或者拒签注明', 1, 1, '2022-06-26 23:50:07', 1, '2022-06-26 23:50:07');
INSERT INTO `lc_case_execution_step_item` VALUES (99, 5, 12, 7, '立案决定书', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (100, 5, 12, 7, '立案告知书', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (101, 5, 13, 7, '勘验笔录', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (102, 5, 13, 7, '现场照片', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (103, 5, 13, 7, '现场图', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (104, 5, 13, 7, '对照片应当有文字说明', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (105, 5, 13, 7, '勘察人、见证人签字', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (106, 5, 13, 7, '重大案件应当录像', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (107, 5, 13, 7, '现场勘查证', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (108, 5, 14, 7, '立案决定书', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (109, 5, 14, 7, '立案告知书', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (110, 5, 15, 7, '扣押决定书', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (111, 5, 15, 7, '区分审批权限', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (112, 5, 15, 7, '扣押物品清单', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (113, 5, 15, 7, '拍照或者录音录像', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (114, 5, 15, 7, '办案人、持有人、见证人签字', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
INSERT INTO `lc_case_execution_step_item` VALUES (115, 5, 15, 7, '持有人不在或者拒签注明', 1, 1, '2022-06-26 23:50:47', 1, '2022-06-26 23:50:47');
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
INSERT INTO `lc_case_type` VALUES (1, '100', '行政', '行政类别', 1, '2022-06-13 23:03:14', 1, '2022-06-26 08:01:26');
INSERT INTO `lc_case_type` VALUES (3, '200', '刑事', '刑事类别', 1, '2022-06-13 23:19:25', 1, '2022-06-26 08:15:50');
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
INSERT INTO `sys_user` VALUES (1, '管理员', '男', '行政部', '13000000000', '$2a$10$gffBar461k.3mTE7Tq8QZ.weplGcErO43y0quv.sQLNglifswU1gG', NULL, 'ADMIN,USER', 1, 1, '2022-06-08 21:26:23', 1, '2022-06-27 15:27:49');
INSERT INTO `sys_user` VALUES (2, 'test1', '男', '井店镇派出所', '13000000002', '$2a$10$bYFKJ8xCrDXQ2ytmV3SeAe0b2gvNtbNHVvhx7/AGrBBT77N.R4Msa', '123', 'USER', 2, 1, '2022-06-12 13:02:35', 1, '2022-06-27 14:31:17');
INSERT INTO `sys_user` VALUES (3, '秦始皇', '男', '长安派出所', '13000000001', '$2a$10$FE1CTfWlD0zCa6YJ/BmifOb9ZVvJy2kx9Yy.EXCJsR4Yc1hun9F7y', '我是长安派出所的秦始皇，请审批', 'USER', 1, 1, '2022-06-27 14:06:27', 1, '2022-06-27 14:31:17');
INSERT INTO `sys_user` VALUES (4, '刘邦', '男', '泗水亭长', '13000000003', '$2a$10$C3CBkHLjWi9NFZ0dctgbtupzXR7eZqMYeR/NnKcyqlB12rmuuyOCS', '我是泗水亭长，请审批', 'USER', 0, 1, '2022-06-27 14:07:11', 1, '2022-06-27 14:07:11');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
