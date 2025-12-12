import { useState } from 'react'
import { 
  PARTICIPATION_BUCKETS, 
  PARTICIPATION_BUCKETS_GAS, 
  POPULATION_BUCKETS,
  REJ_STATUS_BUCKETS
 } from '../types/buckets'

export function useMapLegend() {
  const [activeLayers, setActiveLayers] = useState<string[]>(['electric_participation_rate_avg'])

  const addLayer = (layerKey: string) => {
    setActiveLayers(prev => {
      if (!prev.includes(layerKey)) {
        return [...prev, layerKey]
      }
      return prev
    })
  }

  const removeLayer = (layerKey: string) => {
    setActiveLayers(prev => prev.filter(key => key !== layerKey))
  }

  const toggleLayer = (layerKey: string, isActive: boolean) => {
    if (isActive) {
      addLayer(layerKey)
    } else {
      removeLayer(layerKey)
    }
  }

  const getLegendConfigForLayer = (layerKey: string) => {
    switch (layerKey) {
      case 'electric_participation_rate_avg':
        return {
          id: layerKey,
          title: 'Electric Participation Rate',
          buckets: PARTICIPATION_BUCKETS
        }
      case 'gas_participation_rate_avg':
        return {
          id: layerKey,
          title: 'Gas Participation Rate',
          buckets: PARTICIPATION_BUCKETS_GAS
        }
      case 'POPULATION':
        return {
          id: layerKey,
          title: 'Population',
          buckets: POPULATION_BUCKETS
        }
      case 'REJ__flag_':
        return {
          id: layerKey,
          title: 'REJ Status',
          buckets: REJ_STATUS_BUCKETS
        }
      default:
        return null
    }
  }

  const legendConfigs = activeLayers
    .map(getLegendConfigForLayer)
    .filter(Boolean) as Array<{ id: string; title: string; buckets: typeof PARTICIPATION_BUCKETS }>

  return {
    activeLayers,
    toggleLayer,
    legendConfigs
  }
}

