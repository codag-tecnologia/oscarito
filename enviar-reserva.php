<?php
if ($_POST) {
    // Dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $data = $_POST['data'];
    $horario = $_POST['horario'];
    $pessoas = $_POST['pessoas'];
    $observacoes = $_POST['observacoes'];
    
    // Email de destino
    $para = 'bymatheusmoraes@gmail.com';
    $assunto = 'Nova Reserva - Restaurante Oscarito';
    
    // Formatação da data
    $data_formatada = date('d/m/Y', strtotime($data));
    
    // Corpo do email
    $mensagem = "
    Nova reserva recebida do site Oscarito Restaurante:
    
    Nome: $nome
    Email: $email
    Telefone: $telefone
    Data: $data_formatada
    Horário: $horario
    Número de pessoas: $pessoas
    Observações: $observacoes
    
    ---
    Enviado automaticamente do formulário de reservas
    ";
    
    // Headers do email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Enviar email
    if (mail($para, $assunto, $mensagem, $headers)) {
        echo '<script>
            alert("Reserva enviada com sucesso! Entraremos em contato em breve.");
            window.location.href = "index.html#contact";
        </script>';
    } else {
        echo '<script>
            alert("Erro ao enviar reserva. Tente novamente.");
            window.history.back();
        </script>';
    }
} else {
    // Redirecionar se acessar diretamente
    header('Location: index.html');
}
?>
