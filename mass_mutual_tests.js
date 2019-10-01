import { Selector } from 'testcafe';
import page_objects from './page_object_template';

const page_object = new page_objects();
let tempVar = 0;

fixture `Mass Mutual Test`
  .page `file:///Users/alexj/Documents/Elemental%20Machines/Projects/Dashboard/New%20Regression/Mass%20Mutual%20Test/testpage.html`
  .before( async ctx => {
  })
  .beforeEach( async t => {
  })
  .afterEach( async t => {
  });

function validateCurrency(amount) {
    var regex = /^[1-9]\d*(?:\.\d{0,2})?$/;
    return regex.test(amount);
}

function retrieveValues(txt_vals){
  var retrieved_vals = [];
  for (const value of txt_vals){
    var temp = value;
    temp = temp.toString().replace(/,\s?/g, "");
    temp = temp.toString().replace(/\$/g, '');
    retrieved_vals.push(Number(temp));
  }
  return retrieved_vals;
}

test('Test 1 - Verify Field Values Greater Than 0', async t => {
  var txt_vals = [await page_object.textbox1.value, await page_object.textbox2.value, await page_object.textbox3.value,
    await page_object.textbox4.value, await page_object.textbox5.value, await page_object.total.value];

  for (const value of retrieveValues(txt_vals)){
    await t.expect(value).gt(0);
  }
});

test('Test 2 - Verify Total Field Value', async t => {
  var txt_vals = [await page_object.textbox1.value, await page_object.textbox2.value, await page_object.textbox3.value,
    await page_object.textbox4.value, await page_object.textbox5.value];
  var count = 0;

  for (const value of retrieveValues(txt_vals)){
    count = count + Number(value);
  }

  var total = await page_object.total.value;
  total = total.toString().replace(/,\s?/g, "");
  total = total.toString().replace(/\$/g, '');
  total = Number(total);

  await t.expect(total).eql(count);
});

test('Test 3 - Verify Field Formatted As Currency', async t => {
  var txt_vals = [await page_object.textbox1.value, await page_object.textbox2.value, await page_object.textbox3.value,
    await page_object.textbox4.value, await page_object.textbox5.value, await page_object.total.value];

    for (const value of retrieveValues(txt_vals)){
      await t.expect(validateCurrency(value)).eql(true);
    }
});

test('Test 4 - Verify Values In Fields', async t => {
  var txt_vals = [await page_object.textbox1.value, await page_object.textbox2.value, await page_object.textbox3.value,
    await page_object.textbox4.value, await page_object.textbox5.value, await page_object.total.value];
  var expected_vals = [122365.24, 599.00, 850139.99, 23329.50, 566.27, 1000000.00];

  await t.expect(retrieveValues(txt_vals)).eql(expected_vals);
});

test('Test 5 - Verify UI', async t => {
  for (const feature of page_object.featureList) {
    await t
      .expect(feature.label).ok();
  }
});
