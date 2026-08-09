Add-Type -AssemblyName System.Drawing

$src = "C:\Users\ADMIN\.gemini\antigravity\brain\15d4eb4a-8af0-4ec5-8079-dc8a8e5dd38b\.user_uploaded\media_1786178753759.png"
$bmp = New-Object System.Drawing.Bitmap($src)

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 230 -and $c.G -gt 230 -and $c.B -gt 230) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$dest1 = "C:\Users\ADMIN\.gemini\antigravity\scratch\erlan-villania-portfolio\public\erlan_transparent.png"
$dest2 = "C:\Users\ADMIN\.gemini\antigravity\scratch\erlan-villania-portfolio\public\erlan_avatar.png"
$dest3 = "C:\Users\ADMIN\.gemini\antigravity\scratch\erlan-villania-portfolio\public\erlan_avatar.jpg"

$bmp.Save($dest1, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($dest2, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($dest3, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Transparent PNG cutout created successfully!"
