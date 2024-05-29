import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def mark_todo_as_complete(todo_id):
    try:
        response = table.update_item(
            Key={'id': todo_id},
            UpdateExpression='SET #status = :status',
            ExpressionAttributeNames={'#status': 'Status'},
            ExpressionAttributeValues={':status': 'Completed'},
            ReturnValues='ALL_NEW'
        )
        return response
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return None

def lambda_handler(event, context):
    try:
        print(f"Received event: {event}")
        todo_id = event['pathParameters']['id']
        response = mark_todo_as_complete(todo_id)
        print(f"DynamoDB response: {response}")

        if response and 'Attributes' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'  
                },
                'body': json.dumps({'message': 'Todo item marked as complete', 'item': response['Attributes']})
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
            'body': json.dumps({'error': 'Internal Server Error'})
        }