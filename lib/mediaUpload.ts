import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhya25lbnl2Z2lsa3JuZ2x4ZHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzI5MTAsImV4cCI6MjA3MTcwODkxMH0.GgFAeHjqdV2ogVLjkkrX_WFD96rtyv4eybPrJsyKcrc"

const supabase_url = "https://xrknenyvgilkrnglxdqo.supabase.co"

const supabase = createClient(supabase_url, anon_key);

export const mediaUpload = (file:File|null):Promise<string> => {

    return new Promise((resolve, reject) => {

        //check if upload file is null
        if(file == null){
            reject("No files were selected");
        }

        //get current time stamp
        const timeStamp = new Date().getTime();

        //create unique file name
        const fileName = timeStamp + file.name;

        //define the bucket name "images"
        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        }).then(() => {
            //get the image url
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            console.log(publicUrl);
            resolve(publicUrl);
        }).catch(()=>{
            reject("Error uploading file");
        })
    })

}
