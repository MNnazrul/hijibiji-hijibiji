# DEBUG: Detailed information, typically of interest only when diagnosing problems.

# INFO: Confirmation that things are working as expected.

# WARNING: An indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected.

# ERROR: Due to a more serious problem, the software has not been able to perform some function.

# CRITICAL: A serious error, indicating that the program itself may be unable to continue running.


import logging

logging.basicConfig(filename='test.log', level=logging.DEBUG, format='%s(asctime)s:%(name)s:%(message)s')

num1 = 20
num2 = 20

logging.debug(num1 + num2)
logging.debug(num1 * num2)



