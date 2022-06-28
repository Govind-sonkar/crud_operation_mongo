const dbConnect =require('./database_connect');     // import dbConnect here .
const input= require('readline-sync')

const start = ()=>{
    console.log('1] Read_data\n2] Insert_data\n3] user_login\n4] Update_date\n5] Delete_data\n6] Existing.')
    let a=input.questionInt("Choose your option :-")
    if(a===1){      // -------------------------------------------- Read_data .
        console.log('1] Read sigle data\n2] Read multiple data');
        let b=input.questionInt('choose your option :-')
        if(b===1){      // ------------------------------------ Read sigle data .
            const Read_data = async ()=>{
                let data = await dbConnect();

                let db_Email=input.question('Enter email ID :-');
                let db_name=input.question('Enter email ID :-');
                data = await data.find({Email:db_Email}).toArray();
                console.log(data);
                start();    // colling start function here becouse show in console.log()massage. 
            }
            Read_data();
        }
        else if(b===2){     // -------------------------------- Read multiple data .
            const Read_data = async ()=>{
                let data = await dbConnect();
                data = await data.find({}).toArray();
                console.log(data);
                start();   // colling start function here becouse show in console.log()massage.
            }
            Read_data();
        }
    }

    else if (a===2){        // -------------------------------------------- Insert_data .
        console.log('1] Insert single data\n2] Insert multiple data');
        let b=input.questionInt('choose your option :-')
        if (b===1){     // ------------------------------------------ Insert single data .
            const Insert_data = async()=>{
                const db = await dbConnect();
                let db_Email= input.question('Enter your email ID :-')
                let db_name= input.question('Enter your name :-')
                let db_city= input.question('Enter your city :-')
                let db_state= input.question('Enter your state :-')
                let db_pin_code= input.questionInt('Enter your pin code :-')
                const result= await db.insertOne(
                    {Email:db_Email,name:db_name,city:db_city,state:db_state,pic_code:db_pin_code}
                );
                if (result.acknowledged){
                    console.log('data inserted...');
                    start();    // colling start function here becouse show in console.log()massage.
                    
                }
            }
            Insert_data();
        }
        else if (b===2){        // ------------------------------------ Insert multiple data .
            let inp = input.questionInt("How many users data insert.please type in number :-")
            for (let i = 1; i<=inp; i++){
                const Insert_data = async()=>{
                    const db = await dbConnect();
                    let db_Email= input.question('Enter your email ID :-')
                    let db_name= input.question('Enter your name :-')
                    let db_city= input.question('Enter your city :-')
                    let db_state= input.question('Enter your state :-')
                    let db_pin_code= input.questionInt('Enter your pin code :-')
                    const result= await db.insertMany(
                        [{Email:db_Email,name:db_name,city:db_city,state:db_state,pic_code:db_pin_code}]
                    );           
                    //  console.log(result);
                    
                    if (result.acknowledged){
                        console.log('data inserted...');
                        start();    // colling start function here becouse show in console.log()massage.
                    }
                }
                Insert_data();
            }
        }
    }

    else if(a===3){     // ----------------------------------------- user login here .
        const user_login = async ()=>{
            let data = await dbConnect();

            let db_Email=input.question('Enter email ID :-');
            let db_name=input.question('Enter user name :-');
            data = await data.find({Email:db_Email} && {name:db_name}).toArray();
            if(data.length>0){
                console.log("login successfully...");
                console.log(data);  // show users data on terminal 
                start();    // colling start function here becouse show in console.log()massage.                
            }
            else{
                console.log('please type correct details .');
                start();    // colling start function here becouse show in console.log()massage.
            }
        }
        user_login();
    }

    else if(a===4){     // --------------------------------------- Update_data .
        const Update_data =async ()=>{
            const db = await dbConnect();
            let db_Email= input.question('Enter your Email ID :-')
            let db_name= input.question('Enter your name :-')
            let db_city= input.question('Enter your city :-')
            let db_state= input.question('Enter your state :-')
            let db_pin_code= input.question('Enter your pin code :-')

            const result= await db.updateOne(        // -------update single data .
                {Email:db_Email},{$set:{name:db_name, city:db_city,state:db_state, pic_code:db_pin_code}}   
            );
        
            //  console.log(result);
        
            if (result.acknowledged){
                console.log('data updated...');
            }
        }
        Update_data();    
    }

    else if (a===5){        // ------------------------------------- Delete_data .
        const Delete_data =async ()=>{
            const db = await dbConnect();
            let db_Email= input.question('Enter your name :-')
            result= await db.deleteOne(    //-------------delete single data .
                {Email:db_Email}
            );
            //  console.log(result);
        
            if (result.acknowledged){
                console.log('data deleted...');
            }
        }
        Delete_data();
    }
    else if(a===6){       // ----------------------------------------------- Existing .
        console.log('Thank you for Existing...');
    }
}
start();
