ALTER TABLE `lc_case_execution` 
MODIFY COLUMN `name_search` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `lastmodified_time`;
ALTER TABLE `lc_law_article` 
MODIFY COLUMN `title_search` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `lastmodified_time`;
