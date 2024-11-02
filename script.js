$(document).ready(function() {
    $('#convert').click(function() {
        // 獲取用戶輸入的金額和選擇的貨幣
        let amount = $('#amount').val();
        let fromCurrency = $('#fromCurrency').val();
        let toCurrency = $('#toCurrency').val();

        // 檢查用戶輸入的金額
        if (amount === "" || amount <= 0) {
            $('#result').html("Please enter a valid amount.");
            return;
        }

        // API 請求的 URL (請用您的 API 密鑰替換 YOUR-API-KEY)
        let apiKey = "359d1e29cae7f5e0bb16fd77";
        let url = `https ://v6.exchangerate-api.com/v6/359d1e29cae7f5e0bb16fd77/latest/USD`;

        // 使用 AJAX 發送請求
        $.ajax({
            url: url,
            method: "GET",
            success: function(response) {
                if (response.result === "success") {
                    // 獲取匯率並計算兌換結果
                    let rate = response.conversion_rates[toCurrency];
                    let convertedAmount = (amount * rate).toFixed(2);

                    // 在頁面上顯示結果
                    $('#result').html(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
                } else {
                    $('#result').html("Error fetching exchange rate.");
                }
            },
            error: function() {
                // 顯示錯誤信息
                $('#result').html("Failed to get exchange rate. Please try again later.");
            }
        });
    });
});
