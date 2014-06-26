<?php
	$titulo="Nuevo Color";
	$seccion="colores";
	$funcionValidacion = "formValidationColor";
	$hayImagenes = false;
	$to="show.php?t=$seccion";
?>

<script type="text/javascript" src="../library/jquery-1.9.1.js"></script>
<script type="text/javascript" src="library/farbtastic/farbtastic.js"></script>
<link rel="stylesheet" href="library/farbtastic/farbtastic.css" type="text/css" />
<script type="text/javascript">
   $(document).ready(function() {
		jQuery.farbtastic('#colorPicker').linkTo('#color');
   });
 </script>
 
<div id="wrapper" style="width:500px;">
	<h1 style="margin-bottom: 20px;"><?php echo $titulo ?></h1>
	<?php 
		include('../conexion.php');		
		if( isset($_POST['color']) && isset($_POST['nombre'])) {
			postString("color", $color);
			postString("nombre", $nombre);
			
			$color = preg_replace("/#/",'',$color);
			if ($nombre != "" && strlen($nombre)<=30 && preg_match("/[0-9abcdefABCDEF]{6}/",$color) )  {
				$query = "INSERT INTO colores (color, nombre) VALUES ( '$color', '$nombre' )";
				mysql_query($query, $conexion);
				$id = mysql_insert_id();
				if (mysql_error() == ''){
					echo '<ul id="log"> <li>Se ha cargado los datos correctamente</li></ul>';
					guardarActividad($_SESSION['userActual'], "El usuario ha creado el color: \"$nombre\" ID: $id.");
					redireccionar($to);
				}
				else {
					echo '<ul id="log" class="log"> <li>'. mysql_error().'</li></ul>';
				}
			}
			else {
				$log = "Hubo problemas al completar el formulario. Intente otra vez.";
				echo '<ul id="log" class="log"><li>'. $log .'</li></ul>';
			}
		}
		else {
			echo '<ul id="log"></ul>';				
		}
	?>
	
	<form name="form" method="post" action="upload.php?t=<?php echo $seccion ?>"  onsubmit="return <?php echo $funcionValidacion ?>(<?php if ($hayImagenes) echo "false" ?>);" <?php if ($hayImagenes) echo 'enctype="multipart/form-data"' ?>>
		<ul>
			<li><label for="nombre">Nombre</label></li>
			<li><input type="text" style="width: 270px;" name="nombre" size="35" maxlength="30"/></li>
			
			<li><label for="color">Color</label></li>
			<li><input type="text" id="color" style="width: 270px;" name="color" size="35" maxlength="30" value="#ff0000"/></li>
			
			<li><div  style="padding-top: 70px; padding-left: 120px;" id="colorPicker"></div></li>
			
			<input type="button" name="Cancelar" value="Cancelar" class="submit" onclick="window.location = '<?php echo $to; ?>'" />
			<input type="submit" class="submit" name="Guardar" value="Guardar" />
		</ul>
	</form>
</div>