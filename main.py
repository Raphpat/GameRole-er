import discord
import json

with open('authToken.json', 'r') as tokenFile:
    data = tokenFile.read()
    token = json.loads(data)['token']

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    # Event listener for a new member joining.
    async def on_member_join(self, member):
        guild = member.guild
        member.send('Hello! And welcome to {guild.mention}.\nI am a bot, and will guide you through your first steps in this server.')


client = MyClient()
client.run(token)