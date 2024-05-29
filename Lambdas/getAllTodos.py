import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def get_all_todos():
    try:
        response = table.scan()
        return response.get('Items', [])
    except Exception as e:
        print(f"Exception: {str(e)}")
        return []

def lambda_handler(event, context):
    try:
        todos = get_all_todos()
        return todos
    except Exception as e:
        return {'error': 'Internal Server Error'}