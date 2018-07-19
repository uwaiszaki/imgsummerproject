from channels.generic.websocket import AsyncWebsocketConsumer
import json

class UserConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        await self.channel_layer.group_add(
            'StreamUsers',
            self.channel_name
        )
        await self.accept()


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            'StreamUsers',
            self.channel_name
        )


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url = text_data_json['url']
        playing = text_data_json['playing']
        muted = text_data_json['muted']
        volume = text_data_json['volume']
        currtime = text_data_json['currtime']
        
        # Send message to room group
        await self.channel_layer.group_send(
            'StreamUsers' , 
            {
                'type': 'stream_msg',
                'url': url,
                'playing': playing,
                'muted': muted,
                'volume': volume,
                'currtime': currtime,
            }
        )
        
            

    # Receive message from room group
    async def stream_msg(self, event):
        url = event['url']
        playing = event['playing']
        muted = event['muted']
        volume = event['volume']
        currtime = event['currtime']
        
        await self.send(text_data=json.dumps({
            'url': url,
            'playing': playing,
            'muted': muted,
            'volume': volume,
            'currtime': currtime,

        }))

"""


class UserConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        await self.channel_layer.group_add(
            "stream",
            self.channel_name           

        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "stream",
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url = text_data_json['url']
        playing = text_data_json['playing']
        muted = text_data_json['muted']
        currtime = text_data_json['currtime']
        volume = text_data_json['volume']

        await self.channel_layer.group_send(
            "stream",
            {
                'type': 'web_stream',
                'url': url,
                'playing': playing,
                'muted': muted,
                'currtime': currtime,
                'volume': currtime,
            }
        )

    async def web_stream(self, event):
        url = event['url']
        playing = event['playing']
        muted = event['muted']
        volume = event['volume']
        currtime = event['currtime']

        await self.send(text_data=json.dumps({
                'url': url,
                'playing': playing,
                'muted': muted,
                'volume': volume,
                'currtime': currtime,
        }))

"""