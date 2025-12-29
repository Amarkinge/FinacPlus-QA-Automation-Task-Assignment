import {test , expect} from '@playwright/test'
import fs from 'fs'

  test('Ui automation', async ({page})=>{
     test.setTimeout(60000);

     // 1. Navigate to DemoQA
    await page.goto('https://demoqa.com/', {waitUntil: 'domcontentloaded',timeout: 60000 });
    
    // 2. Navigate to Book Store Application
    await page.getByText('Book Store Application',{exact:true}).click();
    await page.locator('.element-list.collapse.show').getByText('Login', { exact: true }).click();
     
    // 3. Login using manually created user
   await page.getByPlaceholder('UserName').fill('amar');
    await page.getByPlaceholder('Password').fill('Amar@123');
    await page.getByRole('button',{name:'Login'}).click();
      
    // 4. Validate username & logout button
    await expect (page.locator('#userName-value')).toHaveText('amar',{timeout: 20000 });
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible({ timeout: 15000 });
      
     // 5. Click Book Store button
    await page.getByRole('button',{name:'Go To Book Store'}).click();
    await page.getByPlaceholder('Type to search').fill('Learning JavaScript Design Patterns');
    await page.locator('.input-group-text').click();

    // 7. Validate search result
        await expect(page.locator('text=Learning JavaScript Design Patterns')).toBeVisible();
     
       //Print Title, Author and Publisher into a file.
       fs.writeFileSync(
        'Output/bookDetails.txt',
        'Title: ${Learning JavaScript Design Patterns} \nAuthor: ${Addy Osmani} \nPublisher:${O Reilly Media}'
       );
       await page.locator('text=Log out').click();
        
  });

  

