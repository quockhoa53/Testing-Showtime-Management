const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:5500/index.html');
        await driver.sleep(1000);

        let addButton = await driver.wait(until.elementLocated(By.id('btn-add-showtime')), 10000);
        await driver.wait(until.elementIsVisible(addButton), 10000);
        await driver.sleep(1000);
        await addButton.click();
        await driver.sleep(1000);

        let addModal = await driver.wait(until.elementLocated(By.id('add-employee')), 10000);
        await driver.wait(until.elementIsVisible(addModal), 10000);
        await driver.sleep(1000);

        let movieSelect = await driver.findElement(By.id('movieId'));
        await movieSelect.click();
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.css('#movieId option:nth-child(2)')), 5000).click();
        await driver.sleep(1000);

        let roomSelect = await driver.findElement(By.id('roomId'));
        await roomSelect.click();
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.css('#roomId option:nth-child(2)')), 5000).click();
        await driver.sleep(1000);

        let showDateInput = await driver.findElement(By.id('showDate'));
        await showDateInput.clear();
        await driver.sleep(1000);
        await showDateInput.sendKeys('03-21-2025');
        await driver.sleep(1000);

        let showHourSelect = await driver.findElement(By.id('showHour'));
        await showHourSelect.click();
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.css('#showHour option[value="18"]')), 5000).click();
        await driver.sleep(1000);

        let showMinuteSelect = await driver.findElement(By.id('showMinute'));
        await showMinuteSelect.click();
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.css('#showMinute option[value="30"]')), 5000).click();
        await driver.sleep(1000);

        let submitButton = await driver.findElement(By.css('#addShowtimeForm button[type="submit"]'));
        await submitButton.click();
        await driver.sleep(1000);

        let successModal = await driver.wait(until.elementLocated(By.id('success-modal-add')), 10000);
        await driver.wait(until.elementIsVisible(successModal), 10000);
        await driver.sleep(1000);

        let successMessage = await driver.findElement(By.css('#success-modal-add .modal-body')).getText();
        assert.strictEqual(successMessage, 'Showtime has been added successfully!', 'Success message is not correct');
        await driver.sleep(1000);

        console.log("Test Passed: Showtime added successfully!");
    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
}

runTest();