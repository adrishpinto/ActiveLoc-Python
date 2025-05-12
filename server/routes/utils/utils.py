
import requests

def get_conversion_rate(from_currency, to_currency="INR"):
    if from_currency == to_currency:
        return 1.0
    try:
        response = requests.get(
            f"https://api.frankfurter.app/latest?from={from_currency}&to={to_currency}"
        )
        response.raise_for_status()
        data = response.json()
        return data["rates"][to_currency]
    except Exception as e:
        print(f"Error fetching rate from {from_currency} to {to_currency}: {e}")
        return None

def calculate_vendor_total_in_inr(vendors):
    total = 0
    for v in vendors:
        if hasattr(v, "current_rate") and hasattr(v, "units") and \
           hasattr(v, "billing_currency") and \
           v.current_rate is not None and v.units is not None and v.billing_currency:

            cost = v.current_rate * v.units
            rate = get_conversion_rate(v.billing_currency, "INR")
            if rate is None:
                print(f"Skipping vendor {v} due to missing rate.")
                continue
            cost_in_inr = cost * rate
            print(f"{v}: {cost_in_inr} INR")
            total += cost_in_inr
    return total