import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def get_todo(todo_id):
    try:
        response = table.get_item(
            Key={'id': todo_id}
        )
        if 'Item' in response:
            return response['Item']
        else:
            return None
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return None

def lambda_handler(event, context):
    try:
        print(f"Received event: {event}")
        todo_id = event['pathParameters']['id']
        todo = get_todo(todo_id)
        print(f"DynamoDB response: {todo}")

        if todo:
            return {
                'statusCode': 200,
                'body': json.dumps(todo)
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Todo item not found'})
            }
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
