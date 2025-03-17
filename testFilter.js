const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('chromedriver');
const assert = require('assert');

async function testFilterDate() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:5500/index.html');

        await driver.wait(until.elementLocated(By.id('sortTable')), 10000);
        await driver.wait(until.elementLocated(By.id('filterDate')), 10000);
        console.log('Trang đã tải, DataTable và dropdown filterDate sẵn sàng.');

        let filterSelect = await driver.findElement(By.id('filterDate'));
        let options = await filterSelect.findElements(By.tagName('option'));
        assert.ok(options.length >= 7, 'Dropdown không chứa đủ 7 ngày như mong đợi.');
        console.log(`Dropdown filterDate có ${options.length} tùy chọn.`);

        const targetDate = '2025-03-20';
        await filterSelect.sendKeys('20/03/2025');
        await driver.sleep(2000);
        console.log('Đã chọn ngày 20-03-2025 từ dropdown.');

        let selectedOption = await filterSelect.findElement(By.css('option:checked'));
        let selectedValue = await selectedOption.getAttribute('value');
        assert.strictEqual(selectedValue, targetDate, `Ngày được chọn (${selectedValue}) không khớp với ${targetDate}.`);
        console.log(`Xác nhận: Ngày được chọn trong dropdown là ${targetDate}.`);

        let rows = await driver.findElements(By.css('#sortTable tbody tr'));
        if (rows.length === 0) {
            let emptyTableText = await driver.findElement(By.css('#sortTable tbody td')).getText();
            assert.strictEqual(emptyTableText, 'Loading showtimes...', 'Bảng trống nhưng không hiển thị thông báo đúng.');
            console.log('Bảng trống, không có suất chiếu nào cho ngày 20-03-2025.');
        } else {
            for (let row of rows) {
                let showDateCell = await row.findElement(By.css('td:nth-child(4)'));
                let showDateText = await showDateCell.getText();
                assert.strictEqual(showDateText, '20/03/2025', 
                    `Suất chiếu có ngày "${showDateText}" không khớp với ngày lọc "20/03/2025".`);
            }
            console.log(`Bảng hiển thị ${rows.length} suất chiếu cho ngày 20-03-2025.`);
        }

    } catch (error) {
        console.error('Lỗi trong quá trình kiểm tra:', error);
    } finally {
        await driver.quit();
    }
}

testFilterDate();