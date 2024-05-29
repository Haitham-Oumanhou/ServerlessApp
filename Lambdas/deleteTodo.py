import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def delete_todo(todo_id):
    try:
        response = table.delete_item(
            Key={'id': todo_id},
            ReturnValues='ALL_OLD'
        )
        return response
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return None

def lambda_handler(event, context):
    try:
        todo_id = event['pathParameters']['id']
        
        response = delete_todo(todo_id)
        print(f"DynamoDB response: {response}")

        if response and 'Attributes' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Todo item deleted', 'item': response['Attributes']})
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Todo item not found'})
            }
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
