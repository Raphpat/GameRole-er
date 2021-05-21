import discord
import json

with open('authToken.json', 'r') as tokenFile:
    data = tokenFile.read()
    token = json.loads(data)['token']

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

client = MyClient()
client.run(token)