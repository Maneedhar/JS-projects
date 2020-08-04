//Event Listener for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){

  //Hide results
  document.getElementById('results').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
})

function calculateResults()
{
  //UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const EMI = document.getElementById('monthly-payment');
  const totalAmount = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute EMI
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly))
  {
    EMI.value = monthly.toFixed(2);
    totalAmount.value =  (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //Show Results
    document.getElementById('results').style.display = 'block';

    //Hide loader
    document.getElementById('loading').style.display = 'none';

  } else 
  {
    showError('Check Entered Values');
  }
}

function showError(error)
{
  //Hide Results
  document.getElementById('results').style.display = 'none';

  //Hide loader
  document.getElementById('loading').style.display = 'none';

  //create a div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger'

  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3000 milli seconds
  setTimeout(clearError, 3000)
}

//clear error
function clearError()
{
  document.querySelector('.alert').remove();
}