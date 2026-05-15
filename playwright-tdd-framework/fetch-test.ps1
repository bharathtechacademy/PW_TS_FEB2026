$envContent = Get-Content "C:\Training\PlaywrightTrainings\Feb_2026\playwright-tdd-framework\.env"
$patLine = $envContent | Where-Object { $_ -match "^AZURE_PAT=" }
$pat = $patLine.Split("=", 2)[1].Trim().Trim("""")
$baseAuth = [Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes(":$pat"))
$uri = "https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_apis/wit/workitems/857?api-version=7.1"
$headers = @{Authorization=("Basic {0}" -f $baseAuth)}
$response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
$title = $response.fields."System.Title"
$out = "TEST CASE ID: 857`r`nTITLE: $title`r`n`r`nSTEPS:`r`n"
if ($response.fields."Microsoft.VSTS.TCM.Steps") {
    [xml]$xml = $response.fields."Microsoft.VSTS.TCM.Steps"
    $i = 1
    foreach ($s in $xml.steps.step) {
        $d = $s.parameterizedString[0].InnerText -replace "<[^>]+>", ""
        $e = $s.parameterizedString[1].InnerText -replace "<[^>]+>", ""
        $out += "Step $i: $d`r`nExpected: $e`r`n`r`n"
        $i++
    }
}
$out | Out-File -FilePath "test-case-857-details.txt" -Encoding utf8
Get-Content "test-case-857-details.txt"
