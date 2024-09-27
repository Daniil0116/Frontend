function calc(expression) {
    var tokens = expression
        .replace(/\(/g, '( ')
        .replace(/\)/g, ' )')
        .trim()
        .split(/\s+/)
        .reverse();
    var evaluate = function (tokens) {
        var token = tokens.pop();
        if (token === undefined) {
            throw new Error("Неправильное выражение");
        }
        // Проверка на отрицательное число
        if (!isNaN(Number(token))) {
            return Number(token);
        }
        if (token === '(') {
            var innerResult = evaluate(tokens);
            if (tokens.pop() !== ')') {
                throw new Error("Несоответствующие скобки");
            }
            return innerResult;
        }
        var left = evaluate(tokens);
        var right = evaluate(tokens);
        switch (token) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                if (right === 0) {
                    throw new Error("Деление на ноль");
                }
                return left / right;
            default:
                throw new Error("Неправильный оператор: " + token);
        }
    };
    try {
        var result = evaluate(tokens);
        if (tokens.length > 0) {
            throw new Error("Лишние токены после выражения");
        }
        console.log(result);
    }
    catch (error) {
        console.error(error.message);
    }
}
// Примеры использования
calc("+ 3 4"); // Ожидается: 7
calc("* ( - 5 6) 7"); // Ожидается: -7
calc("+ 1 + 2 3"); // Ожидается: 6
calc("/ 10 + 2 3"); // Ожидается: 2
calc("+ 2 * 3 4"); // Ожидается: 14
calc("* ( + 3 4) ( - 5 6) "); // Ожидается: -7
calc("+ ( * 3 4) ( + 1 2) "); // Ожидается: 15
calc("- 3 4"); // Ожидается: -1
calc("- + 3 4 5"); // Ожидается: 2
calc("+ ( * 3 ( / 4 2)) ( - 5 6)"); // Ожидается 5
calc("+ 3 ) 4"); // Неправильное выражение
calc("*+ 3 4"); // Неправильный оператор *+
calc("+ 3 4 ("); // Лишние токены после выражения
calc("+ 3 ( 4"); // Несоответсвующие скобки
calc("/ 3 0"); // Деление на ноль       
calc("+ * - 8 3 / 15 3 * 2 4");
