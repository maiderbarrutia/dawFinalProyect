import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDDBBTables1748252450122 implements MigrationInterface {
    name = 'CreateDDBBTables1748252450122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UserData\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NULL, \`user_email\` varchar(255) NOT NULL, \`user_phone\` varchar(20) NULL, \`user_city\` varchar(255) NULL, \`user_password\` varchar(255) NULL, \`privacy_policy\` tinyint NOT NULL DEFAULT 0, \`registration_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`IDX_ea3d81ec97fdbf23adeb0d0952\` (\`user_phone\`), UNIQUE INDEX \`IDX_2e423c17923b09b183e5cebe2c\` (\`user_email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Company\` (\`company_id\` int NOT NULL AUTO_INCREMENT, \`company_name\` varchar(255) NOT NULL, \`company_type\` varchar(100) NULL, \`company_logo\` varchar(255) NULL, \`company_cif\` varchar(20) NULL, \`contact_person\` varchar(255) NULL, \`company_phone\` varchar(20) NULL, \`company_address\` text NULL, \`company_website\` varchar(255) NULL, \`company_email\` varchar(255) NULL, \`company_password\` varchar(255) NOT NULL, \`privacy_policy\` tinyint NOT NULL DEFAULT 0, \`registration_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_c6a45e2f16ff822bc247ffc801\` (\`company_cif\`), UNIQUE INDEX \`IDX_bced4869e5741e654f609ad92e\` (\`company_email\`), PRIMARY KEY (\`company_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Category\` (\`category_id\` int NOT NULL AUTO_INCREMENT, \`category_name\` varchar(100) NOT NULL, \`category_description\` text NULL, \`category_image\` varchar(255) NULL, UNIQUE INDEX \`IDX_4404c3459270ad52c54924a377\` (\`category_name\`), PRIMARY KEY (\`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Activity\` (\`activity_id\` int NOT NULL AUTO_INCREMENT, \`activity_title\` varchar(255) NOT NULL, \`activity_description\` text NULL, \`company_id\` int NOT NULL, \`activity_date\` date NULL, \`activity_time\` time NULL, \`activity_price\` decimal(10,2) NULL, \`available_slots\` int NULL, \`activity_duration\` int NULL, \`difficulty_level\` enum ('easy', 'medium', 'hard') NULL, \`activity_type\` varchar(100) NULL, \`category_id\` int NULL, \`activity_location\` text NULL, \`activity_adress\` text NULL, \`activity_images\` json NULL, \`activity_videos\` json NULL, \`includes\` text NULL, \`excludes\` text NULL, \`privacy_policy\` tinyint NOT NULL DEFAULT 0, \`registration_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`IDX_6ab4ea3f83ce6d1aacd1b42a47\` (\`company_id\`), INDEX \`IDX_eec4497373adf65c07b2c0f8e9\` (\`activity_date\`), INDEX \`IDX_82d098ff807d3d2bc7fd4651c9\` (\`category_id\`), PRIMARY KEY (\`activity_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Registration\` (\`registration_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`activity_id\` int NOT NULL, \`registration_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`IDX_44d6a7f598a3222d7f36a61a54\` (\`activity_id\`), INDEX \`IDX_2f08c236f737e3bb0ee6cdab97\` (\`user_id\`), PRIMARY KEY (\`registration_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Activity\` ADD CONSTRAINT \`FK_6ab4ea3f83ce6d1aacd1b42a472\` FOREIGN KEY (\`company_id\`) REFERENCES \`Company\`(\`company_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Activity\` ADD CONSTRAINT \`FK_82d098ff807d3d2bc7fd4651c92\` FOREIGN KEY (\`category_id\`) REFERENCES \`Category\`(\`category_id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_2f08c236f737e3bb0ee6cdab975\` FOREIGN KEY (\`user_id\`) REFERENCES \`UserData\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Registration\` ADD CONSTRAINT \`FK_44d6a7f598a3222d7f36a61a542\` FOREIGN KEY (\`activity_id\`) REFERENCES \`Activity\`(\`activity_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_44d6a7f598a3222d7f36a61a542\``);
        await queryRunner.query(`ALTER TABLE \`Registration\` DROP FOREIGN KEY \`FK_2f08c236f737e3bb0ee6cdab975\``);
        await queryRunner.query(`ALTER TABLE \`Activity\` DROP FOREIGN KEY \`FK_82d098ff807d3d2bc7fd4651c92\``);
        await queryRunner.query(`ALTER TABLE \`Activity\` DROP FOREIGN KEY \`FK_6ab4ea3f83ce6d1aacd1b42a472\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f08c236f737e3bb0ee6cdab97\` ON \`Registration\``);
        await queryRunner.query(`DROP INDEX \`IDX_44d6a7f598a3222d7f36a61a54\` ON \`Registration\``);
        await queryRunner.query(`DROP TABLE \`Registration\``);
        await queryRunner.query(`DROP INDEX \`IDX_82d098ff807d3d2bc7fd4651c9\` ON \`Activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_eec4497373adf65c07b2c0f8e9\` ON \`Activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ab4ea3f83ce6d1aacd1b42a47\` ON \`Activity\``);
        await queryRunner.query(`DROP TABLE \`Activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_4404c3459270ad52c54924a377\` ON \`Category\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
        await queryRunner.query(`DROP INDEX \`IDX_bced4869e5741e654f609ad92e\` ON \`Company\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6a45e2f16ff822bc247ffc801\` ON \`Company\``);
        await queryRunner.query(`DROP TABLE \`Company\``);
        await queryRunner.query(`DROP INDEX \`IDX_2e423c17923b09b183e5cebe2c\` ON \`UserData\``);
        await queryRunner.query(`DROP INDEX \`IDX_ea3d81ec97fdbf23adeb0d0952\` ON \`UserData\``);
        await queryRunner.query(`DROP TABLE \`UserData\``);
    }

}
