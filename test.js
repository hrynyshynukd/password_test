const assert = require('assert');
const prompt = require('prompt');
const crypto = require('crypto');
const { faker } = require('@faker-js/faker');

describe('Тест з faker', function() {

    it('Повертає правильний хеш для випадкового пароля', function(done) {
        const fakePassword = faker.internet.password(); 

        prompt.override = {
            password: fakePassword,
            confirmPassword: fakePassword
        };

        prompt.start();

        prompt.get(['password', 'confirmPassword'], function (err, result) {
            if (err) {
                done(err);
                return;
            }

            const password = result.password;
            const confirmPassword = result.confirmPassword;

            if (password !== confirmPassword) {
                done(new Error('Паролі не співпадають'));
                return;
            }

            const hash = crypto.createHash('sha256').update(password).digest('hex');

            const expectedHash = crypto.createHash('sha256').update(fakePassword).digest('hex');

            assert.strictEqual(hash, expectedHash);

            done();
        });
    });

});
