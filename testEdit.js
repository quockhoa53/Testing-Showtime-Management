const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:5500/index.html');
        console.log("Page loaded");
        await driver.sleep(2000);

        await driver.wait(until.elementLocated(By.id('sortTable')), 10000);
        console.log("Table #sortTable found");

        await driver.wait(until.elementLocated(By.css('#sortTable tbody tr')), 10000);
        console.log("First row in tbody found");
        await driver.sleep(1000);

        let editButton = await driver.wait(until.elementLocated(By.css('#sortTable tbody tr:first-child td:last-child button:nth-child(2)')), 10000);
        console.log("Edit button found:", await editButton.getAttribute('outerHTML'));
        await driver.sleep(2000);

        await driver.wait(until.elementIsVisible(editButton), 10000);
        await editButton.click();
        console.log("Edit button clicked");
        await driver.sleep(2000);

        let editModal = await driver.wait(until.elementLocated(By.id('edit-modal')), 10000);
        await driver.wait(until.elementIsVisible(editModal), 10000);
        console.log("Edit modal displayed");
        await driver.sleep(2000);

        let movieSelect = await driver.findElement(By.id('movie-select'));
        await driver.wait(until.elementIsVisible(movieSelect), 10000);
        await movieSelect.click();
        console.log("Movie select clicked");
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.css('#movie-select option:nth-child(2)')), 5000).click();
        console.log("Movie option selected");
        await driver.sleep(1000);

        let roomSelect = await driver.findElement(By.id('room-select'));
        await driver.wait(until.elementIsVisible(roomSelect), 10000);
        await roomSelect.click();
        console.log("Room select clicked");
        await driver.sleep(1000); // Đợi 1 giây
        await driver.wait(until.elementLocated(By.css('#room-select option:nth-child(2)')), 5000).click();
        console.log("Room option selected");
        await driver.sleep(1000); // Đợi 1 giây

        // Show hour select
        let showHourSelect = await driver.findElement(By.id('hour-select'));
        await driver.wait(until.elementIsVisible(showHourSelect), 10000);
        await showHourSelect.click();
        console.log("Hour select clicked");
        await driver.sleep(1000); // Đợi 1 giây
        await driver.wait(until.elementLocated(By.css('#hour-select option[value="19"]')), 5000).click();
        console.log("Hour option selected");
        await driver.sleep(1000); // Đợi 1 giây

        // Show minute select
        let showMinuteSelect = await driver.findElement(By.id('minute-select'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", showMinuteSelect); // Cuộn trang để phần tử hiển thị
        await driver.wait(until.elementIsVisible(showMinuteSelect), 10000);
        await driver.sleep(1000); // Đợi 1 giây
        await driver.executeScript("arguments[0].click();", showMinuteSelect); // Sử dụng JavaScript để click
        console.log("Minute select clicked");
        await driver.sleep(1000); // Đợi 1 giây
        await driver.wait(until.elementLocated(By.css('#minute-select option[value="45"]')), 5000).click();
        console.log("Minute option selected");
        await driver.sleep(1000); // Đợi 1 giây

        let showDateInput = await driver.findElement(By.id('date-select'));
        await showDateInput.clear();
        await driver.sleep(1000);
        await showDateInput.sendKeys('03-17-2025');
        await driver.sleep(1000);

        // Submit form
        let submitButton = await driver.findElement(By.css('#edit-showtime-form button[type="submit"]'));
        await driver.wait(until.elementIsVisible(submitButton), 5000);
        await submitButton.click();
        console.log("Submit button clicked");

        // Chờ modal thành công
        let successModal = await driver.wait(until.elementLocated(By.id('success-modal')), 10000);
        await driver.wait(until.elementIsVisible(successModal), 10000);
        console.log("Success modal displayed");

        // Kiểm tra thông báo thành công
        let successMessage = await driver.findElement(By.css('#success-modal .modal-body')).getText();
        assert.strictEqual(successMessage, 'Showtime has been successfully updated!', 'Success message is not correct');
        console.log("Test Passed: Showtime updated successfully!");
    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.sleep(2000); // Đợi 2 giây trước khi đóng trình duyệt
        await driver.quit();
    }
}

runTest();