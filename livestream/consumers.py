from channels.generic.websocket import AsyncWebsocketConsumer
import json


class LiveStreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "livestream"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"🟢 Connected: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"🔴 Disconnected: {self.channel_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)

        # Relay to everyone else in the room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "signal_message",
                "sender": self.channel_name,
                "message": text_data
            }
        )

    async def signal_message(self, event):
        # Don't send messages back to the sender
        if self.channel_name != event["sender"]:
            await self.send(text_data=event["message"])
