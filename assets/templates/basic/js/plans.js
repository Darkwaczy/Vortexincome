(function($) {
    "use strict"
    $('.investModal').click(function() {            
        $('.gateway-info').addClass('d-none');
        var modal = $('#investModal');
        var plan = $(this).data('plan');

        modal.find('.planName').text(plan.name)
        modal.find('[name=plan_id]').val(plan.id);
        let fixedAmount = parseFloat(plan.fixed_amount);
        let interestAmount = parseFloat(plan.interest);

        modal.find('.investAmountRange').text(`Invest: ${symbol}${fixedAmount}`);
        modal.find('[name=amount]').val(fixedAmount);
        modal.find('[name=amount]').attr('readonly', true);
        modal.find('.interestDetails').html(`<strong> Interest: ${interestAmount}% </strong>`);
    });

    $('[name=amount]').on('input', function() {
        $('[name=wallet_type]').trigger('change');
    })

    $('[name=wallet_type]').change(function() {
        var amount = parseFloat($('[name=amount]').val());
        if ($(this).val() != 'balance' && amount) {
            var resource = $('select[name=wallet_type] option:selected').data('gateway');
            var fixed_charge = parseFloat(resource.fixed_charge);
            var percent_charge = parseFloat(resource.percent_charge);
            var charge = parseFloat(fixed_charge + (amount * percent_charge / 100));
            var min_amount = parseFloat(resource.min_amount);
            var max_amount = parseFloat(resource.max_amount);

            $('.charge').text(charge);
            $('.rate').text(parseFloat(resource.rate));
            $('.min_amount').text(min_amount);
            $('.max_amount').text(max_amount);
            $('.g-currency').text(resource.currency);
            $('.gateway-info').removeClass('d-none');
            $('.method_currency').text(resource.currency);
            $('.total').text(parseFloat(charge) + parseFloat(amount));

            if(amount < min_amount || amount > max_amount){
                $('#investModal').find('select').prop("selectedIndex", 0);
                $('.gateway-info').addClass('d-none');
                notify('error',`The invest amount does not meet the gateway limit ${min_amount}-${max_amount} ${resource.currency}. Please choose a different gateway`);
            }

        } else {
            $('.gateway-info').addClass('d-none');
        }
    });

    $('#investModal form').submit(function (e) {
        $('#investModal form button[type="submit"]').prop("disabled", true);
    });

})(jQuery);