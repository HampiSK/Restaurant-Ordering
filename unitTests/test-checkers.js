import test from 'ava'
import { stringLenghtChecker, emptyStringChecker, numberChecker } from '../modules/scripts/checkers.js'

test('CHECKERS : numberChecker - is working with different data type', async(test) => {
	test.plan(1)
	try {
        const body = {
            str: "string",
            n1: 0,
            n2: 2
        }
        numberChecker(body)
		test.is(true, true, "error thrown")		
	} catch (err) {
		test.fail('error thrown')
    }
})

test('CHECKERS : numberChecker - less then 0', async(test) => {
	test.plan(1)
	try {
        const body = {
            str: "string",
            n1: -1,
            n2: 2
        }        
        numberChecker(body)
		test.fail("error not thrown")		
	} catch (err) {
		test.is(err.message,"Number for 'n1' is less then 0")
    }
})

test('CHECKERS : numberChecker - is not working with invalid type', async(test) => {
	test.plan(1)
	try {
        const ans1 = emptyStringChecker('')
        const ans2 = emptyStringChecker('null')
        const ans3 = emptyStringChecker(null)
        const ans4 = emptyStringChecker(undefined)
     	test.deepEqual([ans1,ans2,ans3,ans4], [true,true,true,true], "not true")		
	} catch (err) {
		test.fail('error thrown')
    }
})

test('CHECKERS : emptyStringChecker - is working with valid string', async(test) => {
	test.plan(1)
	try {
        const ans = emptyStringChecker('string')
		test.is(ans, false, "not false")		
	} catch (err) {
		test.fail('error thrown')
    }
})

test('CHECKERS : stringLenghtChecker - is working with string', async(test) => {
	test.plan(1)
	try {
        stringLenghtChecker('string', 10)
		test.is(true, true, "error thrown")		
	} catch (err) {
		test.fail('error thrown')
    }
})

test('CHECKERS : stringLenghtChecker - is working with different data type', async(test) => {
	test.plan(1)
	try {
        stringLenghtChecker(5, 10)
		test.is(true, true, "error thrown")		
	} catch (err) {
		test.fail('error thrown')
    }
})

test('CHECKERS : stringLenghtChecker - bigger then max value', async(test) => {
	test.plan(1)
	try {
        stringLenghtChecker('string', 0)
		test.fail("error not thrown")		
	} catch (err) {
		test.is(err.message,"Lenght of 'string' is too long",'wrong error thrown')
    }
})