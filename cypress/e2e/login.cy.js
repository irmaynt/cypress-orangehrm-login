// cypress/e2e/login-simple.cy.js
describe('OrangeHRM - Scenario Login', () => {

  it('TC_LOGIN_001 - Valid login (Admin / admin123)', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC_LOGIN_002a - Username tidak terdaftar', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('User123')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_002b - Username huruf besar semua', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('ADMIN')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC_LOGIN_003a - Password salah (case mismatch)', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_003b - Password salah (angka salah)', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin1234')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_004 - Username & Password kosong', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').clear()
    cy.get('input[name="password"]').clear()
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TC_LOGIN_005 - Username kosong, password diisi', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').clear()
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TC_LOGIN_006 - Password kosong, username diisi', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').clear()
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain.text', 'Required')
  })

  it('TC_LOGIN_007 - Username dengan karakter spesial', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('!@#$%^&*()')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_008 - Username string panjang', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('a'.repeat(200))
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_009 - Password string panjang', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('a'.repeat(200))
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_010 - Password kombinasi lain', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('PasswordSalah!')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_011 - Klik "Forgot your password?"', () => {
    cy.visit('/web/index.php/auth/login')
    cy.contains('Forgot your password?').click()
    cy.url().should('include', 'requestPasswordReset')
    cy.contains(/reset password|reset your password|Reset Password/i).should('be.visible')
  })

  it('TC_LOGIN_012 - Variasi username lain', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('user.not.exist')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

  it('TC_LOGIN_013 - Variasi password lain', () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('123admin!')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')
  })

})
