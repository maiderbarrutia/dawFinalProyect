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
exports.UserData = void 0;
const typeorm_1 = require("typeorm");
let UserData = class UserData {
};
exports.UserData = UserData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserData.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], UserData.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], UserData.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_email', type: 'varchar', length: 255, unique: true, nullable: false }),
    __metadata("design:type", String)
], UserData.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_phone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], UserData.prototype, "user_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_city', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], UserData.prototype, "user_city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_password', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], UserData.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserData.prototype, "privacy_policy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserData.prototype, "registration_date", void 0);
exports.UserData = UserData = __decorate([
    (0, typeorm_1.Entity)('UserData'),
    (0, typeorm_1.Index)(['user_phone'])
], UserData);
