import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Homepage
        await page.goto('http://localhost:5173')
        await page.wait_for_selector('text=BloomHer')
        await page.screenshot(path='homepage.png')
        print("Homepage screenshot taken")

        # 2. Login as Nutritionist (Admin)
        await page.click('text=Login')
        await page.fill('input[placeholder="name@example.com"]', 'nutri@test.com')
        await page.fill('input[placeholder="••••••••"]', '1234')
        await page.click('button:has-text("Sign In")')
        await page.wait_for_selector('text=Dashboard')
        await page.screenshot(path='admin_dashboard.png')
        print("Admin Dashboard screenshot taken")

        # 3. Logout and Login as Client
        await page.click('button:has-text("Logout")')
        await page.click('text=Login')
        await page.fill('input[placeholder="name@example.com"]', 'client@test.com')
        await page.fill('input[placeholder="••••••••"]', '1234')
        await page.click('button:has-text("Sign In")')
        await page.wait_for_selector('text=Dashboard')

        # 4. Book an appointment
        await page.click('button:has-text("New Appointment")')
        await page.wait_for_selector('text=Schedule Appointment')
        await page.screenshot(path='booking_form.png')

        # Select date
        await page.fill('#preferred-date', '2024-12-25')

        # Handle dialog
        page.on("dialog", lambda dialog: dialog.accept())
        await page.click('button:has-text("Confirm Booking")')

        await page.wait_for_timeout(1000)
        await page.screenshot(path='client_dashboard_after_booking.png')
        print("Client Dashboard after booking screenshot taken")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
