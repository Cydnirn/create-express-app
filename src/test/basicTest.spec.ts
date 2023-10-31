import { assert } from "chai";
import Controller from "#controllers/basicController";

describe("BasicController test", function () {
    describe("generateText function", function () {
        it("It should display Hello world", function () {
            let msg = "world";
            let actual = new Controller().generateText(msg);
            let expected = "Hello world";
            assert.equal(actual, expected);
        });
    });
});
