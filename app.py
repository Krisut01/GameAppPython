from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Questions database with different difficulty levels
questions = {
    'easy': [
        { 'question': "What is the output of: print(2 + 2)", 'choices': ["4", "5", "3", "2"], 'answer': "4", 'image': 'easy1.png' },
        { 'question': "What is the output of: print(3 * 2)", 'choices': ["6", "5", "3", "2"], 'answer': "6", 'image': 'easy2.png' }
    ],
    'average': [
        { 'question': "Which of the following is the correct function to add two numbers?", 'choices': ["add(a, b)", "sum(a, b)", "combine(a, b)", "plus(a, b)"], 'answer': "add(a, b)", 'image': 'avg1.png' },
        { 'question': "What will be the result of this code: def add(a, b): return a + b?", 'choices': ["Sum of a and b", "Concatenation of a and b", "Product of a and b", "None of the above"], 'answer': "Sum of a and b", 'image': 'avg2.png' }
    ],
    'hard': [
        { 'question': "Fill in the blank: def multiply(a, b): ___", 'choices': ["return a * b", "print(a * b)", "a + b", "a - b"], 'answer': "return a * b", 'image': 'hard1.png' },
        { 'question': "Fix the syntax error: print('Hello World", 'choices': ["print('Hello World')", "print(Hello World)", "echo('Hello World')", "None of the above"], 'answer': "print('Hello World')", 'image': 'hard2.png' }
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_question/<difficulty>', methods=['GET'])
def get_question(difficulty):
    question_data = random.choice(questions[difficulty])
    return jsonify(question_data)

if __name__ == '__main__':
    app.run(debug=True)