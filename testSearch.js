const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testSearchFunctionality() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:5500/index.html');

        await driver.wait(until.elementLocated(By.id('sortTable')), 10000);
        console.log('DataTable đã được tải.');
        
        let searchBox = await driver.findElement(By.css('.dataTables_filter input'));
        await driver.wait(until.elementIsVisible(searchBox), 5000);
        await driver.sleep(3000);

        let searchKeyword = 'Aveng';
        await searchBox.sendKeys(searchKeyword, Key.RETURN);
        console.log(`Đã nhập từ khóa tìm kiếm: ${searchKeyword}`);
        await driver.sleep(5000);

        let rows = await driver.findElements(By.css('#sortTable tbody tr'));

        if (rows.length === 0) {
            let emptyTableText = await driver.findElement(By.css('#sortTable tbody td')).getText();
            assert.strictEqual(emptyTableText, 'Loading showtimes...', 'Bảng trống nhưng không hiển thị thông báo đúng.');
            console.log('Bảng trống, không có dữ liệu khớp với từ khóa.');
        } else {
            for (let row of rows) {
                let rowText = await row.getText();
                assert.ok(rowText.toLowerCase().includes(searchKeyword.toLowerCase()), 
                    `Hàng "${rowText}" không chứa từ khóa "${searchKeyword}"`);
            }
            console.log(`Tìm kiếm thành công: ${rows.length} hàng khớp với từ khóa "${searchKeyword}".`);
        }

        await searchBox.clear();
        console.log('Đã xóa ô tìm kiếm.');
        await driver.sleep(5000);

        let allRows = await driver.findElements(By.css('#sortTable tbody tr'));
        console.log(`Sau khi xóa tìm kiếm, bảng hiển thị ${allRows.length} hàng.`);
        await driver.sleep(5000);

    } catch (error) {
        console.error('Lỗi trong quá trình kiểm tra:', error);
    } finally {
        await driver.quit();
    }
}

testSearchFunctionality();
