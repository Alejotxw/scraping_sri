import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

export const obtenerDatosRuc = async (ruc) => {
  console.log(`🔍 Iniciando consulta Registro de la Propiedad para RUC: ${ruc}`);

  // Iniciar Puppeteer en Windows
  const browser = await puppeteer.launch({
    headless: false, // Cambia a true si no necesitas ver el navegador
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    // Scrapper principal *************************
    console.log(`🌐 Configurando navegador para simular usuario real...`);

    // Configurar user agent y headers para evitar detección
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Referer': 'https://rploja.gob.ec/',
      'Origin': 'https://rploja.gob.ec/',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    });





    // Navegar al formulario del SRI para establecer cookies y contexto
    console.log('🌐 Navegando al formulario del Registro de la Propiedad...');
    await page.goto('https://www.rplojavirtual.gob.ec/login.xhtml', { waitUntil: 'networkidle2', timeout: 30000 });

    await page.type('input[id="mainForm:username"]', "1105550964");
    await page.type('input[id="mainForm:password"]', "1105550964");
    await page.click('button[id="mainForm:j_idt16"]');
    await delay(3000); // Esperar 30 segundos para que el usuario resuelva el CAPTCHA manualmente si es necesario
    await page.goto('https://www.rplojavirtual.gob.ec/public/bienInmueble.xhtml', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.type('input[id="mainForm:j_idt51"]', ruc);
    await page.click('button[id="mainForm:j_idt78"]');
    await delay(5000); // Esperar 5 segundos para que cargue la información


    page.on('response', async (response) => {
      const url = response.url();
      console.log(`🔄 Capturando respuesta de: ${url}`);
    });

    
    
  //   await browser.close();
  //   return resultado;

   } catch (error) {
     console.error('\n❌ Error en obtenerDatosRuc:', error.message);

     await browser.close();
     return {
       success: false,
       error: 'error_general',
       message: `Error al consultar RP: ${error.message}`,
     };
   }
};

obtenerDatosRuc ('1103527782');