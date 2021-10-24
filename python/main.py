from typing import Literal, Union
import requests
import json


class Database:
    def __init__(self, db_url: str, token: str):
        self.db_url = db_url if db_url.endswith('/') else db_url+'/'
        self.token = token
        self.data = None

    def __assemble_url(self, kind: Union[Literal['get'], Literal['put']]):
        return f'{self.db_url}{"data" if kind == "get" else "update"}?token={self.token}'

    def fetch_data(self):
        res = requests.get(self.__assemble_url('get'))
        res.raise_for_status()
        json_data = res.json()
        self.data = json.loads(json_data['data'])
        return self.data

    def update_data(self):
        res = requests.put(
            self.__assemble_url('put'),
            json={'data': json.dumps(self.data)}
        )
        res.raise_for_status()
