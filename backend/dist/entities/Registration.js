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
exports.Registration = void 0;
const typeorm_1 = require("typeorm");
const UserData_1 = require("./UserData");
const Activity_1 = require("./Activity");
let Registration = class Registration {
};
exports.Registration = Registration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'registration_id' }),
    __metadata("design:type", Number)
], Registration.prototype, "registration_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserData_1.UserData, (userData) => userData.user_id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", UserData_1.UserData)
], Registration.prototype, "userData", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Registration.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Activity_1.Activity, (activity) => activity.activity_id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'activity_id' }),
    __metadata("design:type", Activity_1.Activity)
], Registration.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Registration.prototype, "activity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Registration.prototype, "registration_date", void 0);
exports.Registration = Registration = __decorate([
    (0, typeorm_1.Entity)('Registration'),
    (0, typeorm_1.Index)(['user_id']),
    (0, typeorm_1.Index)(['activity_id'])
], Registration);
