let chai = require('chai'); // syntax 
// expect, should, assert

let expect = chai.expect;
let assert = chai.assert;


let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

var sinonTestFactory = require('sinon-test');
var sinonTest = sinonTestFactory(sinon);

let setupNewUser = require('./demo').setupNewUser;

describe('TESTS SPIES STUBS MOCKS', () => {
    describe('SPIES TESTS', () => {
        it('Should call save once', () => {
            let save = sinon.spy(Database, 'save');

            setupNewUser({ name: 'test', function() { /* */ } });

            save.restore();
            sinon.assert.calledOnce(save);
        });

        it('Should pass object with correct values to save', () => {
            let save = sinon.spy(Database, 'save');
            let info = { name: 'test' };
            let expectedUser = {
                name: info.name,
                nameLowercase: info.name.toLowerCase()
            };

            setupNewUser(info, function () { /* */ });

            save.restore();
            sinon.assert.calledWith(save, expectedUser);
        });
    });

    describe('STUBS TESTS', () => {
        it('should pass object witch correect values to save()', () => {
            let save = sinon.stub(Database, 'save');
            let info = { name: 'test' };
            let expectedUser = {
                name: info.name,
                nameLowercase: info.name.toLowerCase()
            };

            setupNewUser(info, function () { /* */ });

            save.restore();
            sinon.assert.calledWith(save, expectedUser)
        });

        it('should pass the error into the callback if save fails', () => {
            let expectedError = new Error('oops');
            let save = sinon.stub(Database, 'save');
            save.throws(expectedError);
            let callback = sinon.spy();

            setupNewUser({ name: 'foo' }, callback);

            save.restore();
            sinon.assert.calledWith(callback, expectedError);
        });

        it('should pass the database result into the callback', () => {
            let expectedResult = { success: true };
            let save = sinon.stub(Database, 'save');
            save.yields(null, expectedResult);
            let callback = sinon.spy();

            setupNewUser({ name: 'foo' }, callback);

            save.restore();
            sinon.assert.calledWith(callback, null, expectedResult);
        });
    });

    describe('MOCKS TESTS', () => {
        it('should pass object with correct values to save only once', () => {
            let info = { name: 'test' };
            let expectedUser = {
                name: info.name,
                nameLowercase: info.name.toLowerCase()
            }
            let database = sinon.mock(Database);
            // define our expectation upfront
            database.expects('save').once().withArgs(expectedUser);

            setupNewUser(info, function () { /* */ });

            database.verify();
            database.restore();
        });
    });

    describe('sinon.test()', () => {
        it('should call save once', () => {
            let save = sinon.spy(Database, 'save');

            setupNewUser({ name: 'test' }, function () { });

            save.restore();
            sinon.assert.calledOnce(save);
        });

        // if setupNewUser throws an exception in the above test
        // that would mean thee spy would never get called
        // which would wreak havoc in any following tests

        it('should call save once', sinonTest(function () { // !
            let save = this.spy(Database, 'save'); //  !

            setupNewUser({ name: 'test' }, function () { });
            // ! no save.restore()
            sinon.assert.calledOnce(save);
        }));
    });
});