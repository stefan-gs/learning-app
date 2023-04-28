import { Injectable } from '@angular/core';
import { OpenAIApi, Configuration } from 'openai'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  configuration = new Configuration({
    apiKey: environment.openAPI.apiKey
  });

  openai = new OpenAIApi(this.configuration);

  constructor() { }

  async chatWithGPT (message:string): Promise<any> {
    const res = await this.openai.createChatCompletion({
      model : "gpt-3.5-turbo",
      messages: [{role:"user", content:message}],
    });
      return (res.data.choices[0].message?.content)
    }
  
  
}