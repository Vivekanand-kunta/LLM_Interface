# Inference happening over here like the computation over here
from dotenv import load_dotenv
import time
import os 
load_dotenv()

async def Inference(file_loc,prompt:str):
    base_dir=f"{os.getenv("BASE_ADD")}"

    print(f"\n\nUser prompt:{prompt}\n\n")
    # Making setup for preparing data ingestion 
    for cat in file_loc:
        dir=f"{base_dir}/data/{cat}"

        if 'start' not in file_loc[cat]:
            print(f"{cat} files not there for this inference")
            continue

        start=file_loc[cat]['start']
        end=file_loc[cat]['end']
        files = [f for f in os.listdir(dir) if os.path.isfile(os.path.join(dir, f))]
        
        print('This Files will be feed to the Model')
        for i in range(start,end+1):
            print(f"file:{files[i]}")
    
    # Making Model prediction
    time.sleep(10)

    #Returning model output
    return {'msg':f'In this file the user request was {prompt} and the model has evaluated this response and has found that in the given file there is a closed room in which there is a chair and table with airconditoner and a light running and a fan is running and also 4 people sitting near table talking to eachother.There is a person eating food and other person is using his model device'}
    


