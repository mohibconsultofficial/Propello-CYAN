import fs from 'fs';
import path from 'path';

const distPath = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // 1. Create dist/payment-details/index.html
  const paymentDetailsDir = path.join(distPath, 'payment-details');
  if (!fs.existsSync(paymentDetailsDir)) {
    fs.mkdirSync(paymentDetailsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(paymentDetailsDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✓ Created dist/payment-details/index.html');

  // 2. Create dist/payment/index.html (alias)
  const paymentDir = path.join(distPath, 'payment');
  if (!fs.existsSync(paymentDir)) {
    fs.mkdirSync(paymentDir, { recursive: true });
  }
  fs.writeFileSync(path.join(paymentDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✓ Created dist/payment/index.html');

  // 3. Create dist/account/profile/index.html
  const accountProfileDir = path.join(distPath, 'account', 'profile');
  if (!fs.existsSync(accountProfileDir)) {
    fs.mkdirSync(accountProfileDir, { recursive: true });
  }
  fs.writeFileSync(path.join(accountProfileDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✓ Created dist/account/profile/index.html');

  // 4. Create dist/account/index.html & dist/profile/index.html (aliases)
  const accountDir = path.join(distPath, 'account');
  if (!fs.existsSync(accountDir)) {
    fs.mkdirSync(accountDir, { recursive: true });
  }
  fs.writeFileSync(path.join(accountDir, 'index.html'), indexHtml, 'utf-8');
  const profileDir = path.join(distPath, 'profile');
  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }
  fs.writeFileSync(path.join(profileDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✓ Created dist/profile/index.html');

  // 3. Create dist/404.html (for GitHub Pages & static web fallback)
  fs.writeFileSync(path.join(distPath, '404.html'), indexHtml, 'utf-8');
  console.log('✓ Created dist/404.html');

  // 4. Ensure .htaccess is in dist
  const htaccessSource = path.resolve(process.cwd(), 'public', '.htaccess');
  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, path.join(distPath, '.htaccess'));
    console.log('✓ Copied dist/.htaccess');
  }

  // 5. Ensure _redirects is in dist
  const redirectsSource = path.resolve(process.cwd(), 'public', '_redirects');
  if (fs.existsSync(redirectsSource)) {
    fs.copyFileSync(redirectsSource, path.join(distPath, '_redirects'));
    console.log('✓ Copied dist/_redirects');
  }
} else {
  console.warn('dist/index.html not found, skipping route copies.');
}
