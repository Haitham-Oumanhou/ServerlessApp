import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todo')

def update_todo(todo_id, new_task=None, new_status=None):
    try:
        update_expression = 'SET '
        expression_attribute_values = {}
        if new_task is not None:
            update_expression += '#task = :task'
            expression_attribute_values[':task'] = new_task
        if new_status is not None:
            if new_task is not None:
                update_expression += ', '
            update_expression += '#status = :status'
            expression_attribute_values[':status'] = new_status
        
        response = table.update_item(
            Key={'id': todo_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames={
                '#task': 'Task',
                '#status': 'Status'
            },
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues='ALL_NEW'
        )
        return response
    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return None

def lambda_handler(event, context):
    try:
        
        todo_id = event['pathParameters']['id']

        todo_response = table.get_item(Key={'id': todo_id})
        if 'Item' not in todo_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Todo item not found'})
            }

        body = json.loads(event['body'])
        new_task = body.get('Task')
        new_status = body.get('Status')
        
        response = update_todo(todo_id, new_task, new_status)
        print(f"DynamoDB response: {response}")

        if response and 'Attributes' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Todo item updated successfully', 'item': response['Attributes']})
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Todo item not found'})
            }
    except KeyError as e:
        print(f"KeyError: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing path parameter: id'})
        }
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON in request body'})
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
