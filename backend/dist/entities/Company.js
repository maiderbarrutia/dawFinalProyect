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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'company_id' }),
    __metadata("design:type", Number)
], Company.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_type', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_logo', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_cif', type: 'varchar', length: 20, unique: true, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_cif", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "contact_person", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_phone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_website', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_website", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_email', type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "company_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_password', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "company_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "privacy_policy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Company.prototype, "registration_date", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)('Company')
], Company);
