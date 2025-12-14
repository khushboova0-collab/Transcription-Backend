import app from './app';
import { logger } from './utils/logger.util';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
