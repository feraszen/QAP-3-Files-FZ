# FormatValues.py
# A library of formatting and utility functions for the Honest Harry project.
# These functions handle currency, date, and string formatting.

import datetime

def FDollar2(value):
    # Formats a number into a currency string like $9,999.99.
    try:
        return f"${value:,.2f}"
    except (ValueError, TypeError):
        return "$0.00"

def FDateM(date_obj):
    # Formats a date object to 'Mon dd, yyyy' format (e.g., Nov 21, 2023).
    try:
        return date_obj.strftime("%b %d, %Y")
    except AttributeError:
        return "Mon dd, yyyy"

def FDateS(date_obj):
    # Formats a date object to 'DD-MON-YY' format (e.g., 21-NOV-23).
    try:
        return date_obj.strftime("%d-%b-%y").upper()
    except AttributeError:
        return "DD-MON-YY"

# New relevant functions added to the library

def clean_digits(s):

    # NEW FUNCTION: Removes all non-digit characters from a string.
    # Relevant for cleaning phone numbers and plate numbers.
 
    return ''.join([char for char in (s or '') if char.isdigit()])

def fmt_phone(phone_digits):
    
    # NEW FUNCTION: Formats a 10-digit string into (XXX) XXX-XXXX.
    # Relevant for displaying customer phone numbers correctly.
    
    digits = clean_digits(phone_digits)
    if len(digits) == 10:
        return f"({digits[0:3]}) {digits[3:6]}-{digits[6:10]}"
    return phone_digits # Return original if not 10 digits

def make_receipt_id(first_name, last_name, plate_num, phone_num):
    
    # NEW FUNCTION: Creates a standardized receipt ID (XX-XXX-XXXX).
    # Relevant for generating a unique identifier for each sale.
   
    f_initial = first_name[0].upper() if first_name else "X"
    l_initial = last_name[0].upper() if last_name else "X"
    
    # Safely get last 3 chars of plate (even if it's all digits)
    plate_part = plate_num[-3:]
    
    # Safely get last 4 digits of phone
    phone_part = clean_digits(phone_num)[-4:]

    return f"{f_initial}{l_initial}-{plate_part}-{phone_part}"