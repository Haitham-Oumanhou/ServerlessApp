import json
import boto3
import uuid
from botocore.exceptions import ClientError

# Create a DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def post_todo(task):
    try:
        todo = {
            'id': str(uuid.uuid4()),  # Generate a unique id
            'Task': task,
            'Status': 'In Progress'
        }
        response = table.put_item(Item=todo, ReturnValues='ALL_OLD')
        return todo  
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return {'error': e.response['Error']['Message']}

def lambda_handler(event, context):
    try:
        # Extract the task from the event
        task = event.get('Task')

        # Check if task is provided
        if not task:
            return {
                'statusCode': 400,
                'body': 'Missing required field: Task'
            }

        response = post_todo(task)
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {
            'statusCode': 500,
            'body': 'Internal Server Error: ' + str(e)
        }