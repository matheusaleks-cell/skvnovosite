$files = Get-Content "files.txt" -Encoding UTF8
$products = @{}

Write-Host "Processing $($files.Count) files..."

foreach ($file in $files) {
    if ($file -match "^([a-zA-Z0-9]+)-") {
        $rawCode = $matches[1]
        $numericCode = $rawCode -replace "\D", ""
        
        if ($numericCode.Length -lt 3) { 
            $numericCode = $rawCode 
        }
        
        # Construct the image path
        $imagePath = "/images/products/brindes/$file"

        # Filter out logo images
        if ($file -notmatch "logo") {
            if (-not $products.ContainsKey($numericCode)) {
                $products[$numericCode] = @{
                    id             = $numericCode
                    title          = "Cod. $numericCode"
                    category       = "Brindes"
                    images         = @( $imagePath )
                    candidateNames = @()
                }
            }
            else {
                $products[$numericCode].images += $imagePath
            }

            # Attempt to extract a product name from the filename
            # Format often matches: CODE-Description-Numbers.ext or CODE-Description.ext
            # We want to capture "Description"
            if ($file -match "^$rawCode-(.+?)((-|\.|_)\d+)?\.(jpg|png|jpeg)$") {
                $possibleName = $matches[1]
                # Filter out likely color variants or garbage
                if ($possibleName -notmatch "^(azul|verde|vermelho|amarelo|preto|branco|rosa|bege|cinza|prata|dourado|laranja|roxo|lilas|marrom|transparente|[0-9]+|d\d+)$") {
                    $products[$numericCode].candidateNames += $possibleName
                }
            }
            
            # Simple Categorization based on filename keywords
            $lowerFile = $file.ToLower()
            if ($lowerFile -match "copo|caneca|garrafa|squeeze|jarra|termica|cantil") {
                $products[$numericCode].subcategory = "Bebidas"
            }
            elseif ($lowerFile -match "caneta|lapis|marcar|escrita|bloco|caderno|agenda|pasta") {
                $products[$numericCode].subcategory = "Escrit$([char]0x00F3)rio" # Escritório
            }
            elseif ($lowerFile -match "mochila|bolsa|necessaire|sacola|mala|pochete") {
                $products[$numericCode].subcategory = "Bolsas e Mochilas"
            }
            elseif ($lowerFile -match "chaveiro|cordao|botton|pin") {
                $products[$numericCode].subcategory = "Chaveiros e Acess$([char]0x00F3)rios" # Acessórios
            }
            elseif ($lowerFile -match "tecno|usb|power|carregador|fone|mouse|som|caixa") {
                $products[$numericCode].subcategory = "Tecnologia"
            }
            elseif ($lowerFile -match "bone|camisa|camiseta|vestuario|textil|uniforme") {
                $products[$numericCode].subcategory = "T$([char]0x00EA)xtil" # Têxtil
            }
            elseif ($lowerFile -match "casa|cozinha|ferramenta|kit|vinho|churrasco") {
                $products[$numericCode].subcategory = "Casa e Gourmet"
            }
        }
    }
}

$finalProducts = @()
foreach ($key in $products.Keys) {
    $p = $products[$key]
    
    # Ensure product has images before processing
    if ($p.images.Count -eq 0) {
        continue
    }

    # Determine best title and match string
    $bestNameTitle = ""
    $bestNameMatch = ""
    
    # Sort candidates by length (descending) to get the most specific description
    $candidates = $p.candidateNames | Sort-Object { $_.Length } -Descending
    if ($candidates.Count -gt 0) {
        $bestNameMatch = $candidates[0] # Keep dashes for file matching
        $bestNameTitle = $candidates[0] -replace "-", " " 
    }

    $finalTitle = "Cod. $($p.id)"
    if ($bestNameTitle.Length -gt 2) {
        $finalTitle = "$finalTitle - $bestNameTitle"
    }

    # Sort images: 
    # 1. Matches the best name (descriptive file)
    # 2. Length Descending (Prefer "Mochila-Grande.jpg" over "Azul.jpg")
    $sortedImages = $p.images | Sort-Object { 
        if ($bestNameMatch -ne "" -and $_ -match [Regex]::Escape($bestNameMatch)) { 0 } else { 1 } 
    }, { $_.Length } -Descending

    $finalProducts += [PSCustomObject]@{
        id          = $p.id
        title       = $finalTitle
        images      = $sortedImages
        category    = $p.category
        subcategory = if ($p.subcategory) { $p.subcategory } else { "Outros" }
    }
}

$count = $finalProducts.Count
Write-Host "Generated $count products."

# Force UTF-8 encoding for Output
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$jsonContent = $finalProducts | ConvertTo-Json -Depth 4
[System.IO.File]::WriteAllText("$PSScriptRoot/src/brindes.json", $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "JSON saved to src/brindes.json with UTF-8 encoding."
