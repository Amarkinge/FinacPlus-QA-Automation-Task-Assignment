import {test, expect} from '@playwright/test'

test(' Repres Automation api workflow', async({request })=>{

    // CREATE USER
      const createResponse = await request.post('https://reqres.in/api/users',{
        headers: { 'Content-Type': 'application/json','Accept': 'application/json'},
        data: { name: 'Amar',job :' Qa Engineer' }
    });
    expect(createResponse.status()).toBe(201);
        const createBody =await createResponse.json();
          const userId  = createBody.id;
          
          // GET USER
              const getResponse  =await request.get('https://reqres.in/api/users/${userId}');
              expect(getResponse.status()).toBe(200);

               // UPDATE USER
        const updateResponse = await request.put('https://reqres.in/api/users/${userId}',
           headers , { 'Content-Type': 'application/json','Accept': 'application/json'},
            { data : {name: 'Amar updated',job :' Senior qa' }} 
        );

        expect(updateResponse.status()).toBe(200);
           const updateBody= await updateResponse.json();
           expect(updateBody.name).toBe('Amar updated');

});