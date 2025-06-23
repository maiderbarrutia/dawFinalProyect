"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const typeorm_1 = require("typeorm");
const Company_1 = require("./Company");
const Category_1 = require("./Category");
let Activity = class Activity {
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'activity_id' }),
    __metadata("design:type", Number)
], Activity.prototype, "activity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_title', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Activity.prototype, "activity_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "activity_description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.company_id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", Company_1.Company)
], Activity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Activity.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Activity.prototype, "activity_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "activity_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_price', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "activity_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'available_slots', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "available_slots", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_duration', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "activity_duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'difficulty_level', type: 'enum', enum: ['easy', 'medium', 'hard'], nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "difficulty_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_type', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "activity_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.category_id, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Category_1.Category)
], Activity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_location', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "activity_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_adress', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "activity_adress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_images', type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Activity.prototype, "activity_images", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_videos', type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Activity.prototype, "activity_videos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'includes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "includes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'excludes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "excludes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Activity.prototype, "privacy_policy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Activity.prototype, "registration_date", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)('Activity'),
    (0, typeorm_1.Index)(['category_id']),
    (0, typeorm_1.Index)(['activity_date']),
    (0, typeorm_1.Index)(['company_id'])
], Activity);
