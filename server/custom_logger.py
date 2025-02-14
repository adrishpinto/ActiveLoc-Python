import logging
import sys
from colorama import Fore, Style, init

# Initialize Colorama (especially important on Windows)
init(autoreset=True)

class CustomFormatter(logging.Formatter):
    COLORS = {
        logging.DEBUG: Fore.BLUE,
        logging.INFO: Fore.GREEN,
        logging.WARNING: Fore.YELLOW,
        logging.ERROR: Fore.RED,
        logging.CRITICAL: Fore.MAGENTA,
        
    }

    def format(self, record):
        log_color = self.COLORS.get(record.levelno, Fore.WHITE)
        log_message = super().format(record)
        return f"{log_color}{log_message}{Style.RESET_ALL}"

# Create and configure the logger
logger = logging.getLogger("custom_logger")
logger.setLevel(logging.DEBUG)

handler = logging.StreamHandler(sys.stdout)
formatter = CustomFormatter("%(levelname)s: %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
